import React, { useCallback, useEffect, useState } from 'react';
import { Alert,  ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { HighLightCard } from '../../components/HighLightCard';
import { TransactionCard , TransactionCardProps} from '../../components/TransactionCard';

import {
	Container,
	Header,
	UserWrapper,
	UserInfo,
	Photo,
	User,
	UserGreeting,
	Icon,
	UserName,
	HighLightCards,
	Transactions,
	Title,
	TransactionList,
	LogoutButton,
	LoadContainer
 } from './styles';

 export interface DataListProps extends TransactionCardProps {
	 id: string;
 }
 interface HighlightProps {
	amount: string;
	lastTransaction: string;

 }

 interface HighLighsDataProps {
	entries : HighlightProps,
	expensives: HighlightProps,
	total: HighlightProps,

 }
export function Dashboard(){
	const dataKey = '@gofinacen:transacations';
	const [ isLoading, setIsLoading ] = useState(true);
	const [ transactions, setTransactions ] = useState<DataListProps[]>([]);
	const [ highlightData , setHighilightData ] = useState<HighLighsDataProps>({} as HighLighsDataProps);
	const theme = useTheme();

	function getLastDate(
		collection : DataListProps[],
		type : 'positive' | 'negative'
		) {
		const lastTransations = Math.max.apply( Math, collection
			.filter((transaction) => transaction.type === type)
			.map((transaction) => new Date(transaction.date).getTime())
		);

	return Intl
		.DateTimeFormat('pt-BR', {
				day: '2-digit',
				month: 'long'
		})
		.format(new Date(lastTransations));

	}
	async function loadTransacions() {
		try {
			const response = await AsyncStorage.getItem(dataKey);
			const transactions = response ? JSON.parse(response) : [] ;
			let entriesTotal = 0;
			let expenseveTotal = 0;
			const transactionsFormated: DataListProps[]  = transactions.map((item: DataListProps) => {

				if(item.type === 'positive'){
					entriesTotal += Number(item.amount);
				}else{
					expenseveTotal += Number(item.amount);
				}



				const amount = Number(item.amount)
				.toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL'
				});

				const date = Intl
					.DateTimeFormat('pt-BR', {
						day: '2-digit',
						month: '2-digit',
						year: '2-digit'
					})
					.format(new Date(item.date));




				return {
					id: String(item.id),
					name: item.name,
					amount,
					type: item.type,
					category: item.category,
					date
				}
			});
			const lastTransactionsEntries = getLastDate(transactions, 'positive');
			const lastTransactionsExpansives = getLastDate(transactions, 'negative');
			const totalInterval = `01 à ${lastTransactionsExpansives}`;

			setHighilightData({
				entries: {
					amount: entriesTotal.toLocaleString('pt-BR', {
						style: 'currency',
						currency: 'BRL'
					}),
					lastTransaction: `Última entrada ${lastTransactionsEntries}`
				},
				expensives: {
					amount: expenseveTotal.toLocaleString('pt-BR', {
						style: 'currency',
						currency: 'BRL'
					}),
					lastTransaction: `Última saida ${lastTransactionsExpansives}`
				},
				total: {
					amount: (entriesTotal - expenseveTotal).toLocaleString('pt-BR', {
						style: 'currency',
						currency: 'BRL'
					}),
					lastTransaction: totalInterval
				}
			});


			setTransactions(transactionsFormated);

			setIsLoading(false);
		} catch (error) {
			console.log(error);
			Alert.alert("Não foi possivel carregar as informações, tente novamente.");
		}
	}


	useEffect(() => {
		loadTransacions();
		async function removeTransactions(){

			const response = await AsyncStorage.removeItem(dataKey);
		}

	},[]);

	useFocusEffect(useCallback(() => {
		loadTransacions();
	}, []));
	return(
		<Container>

			{isLoading ?
				<LoadContainer>
					<ActivityIndicator
						color={theme.colors.primary}
						size="large"
					/>
				</LoadContainer> :
			<>
				<Header>
					<UserWrapper>
						<UserInfo>
							<Photo
								source={{uri : 'https://avatars.githubusercontent.com/u/17380795?s=60&v=4'}} />
							<User>
								<UserGreeting>Olá, </UserGreeting>
								<UserName>Cesar </UserName>
							</User>
						</UserInfo>
						<LogoutButton onPress={() => {}}>
							<Icon name="power"/>
						</LogoutButton>
					</UserWrapper>
				</Header>
				<HighLightCards>
					<HighLightCard
						title="Entrada"
						amount={highlightData?.entries?.amount}
						lastTransacion={highlightData?.entries?.lastTransaction|| '-'}
						type="up"
						/>
					<HighLightCard
						title="Saídas"
						amount={highlightData?.expensives?.amount}
						lastTransacion={highlightData?.expensives?.lastTransaction || '-'}
						type="down"
						/>
					<HighLightCard
						title="Total"
						amount={highlightData?.total?.amount}
						lastTransacion={highlightData?.total?.lastTransaction || '-'}
						type="total"
						/>
				</HighLightCards>
				<Transactions>
					<Title>Listagem </Title>
					<TransactionList
						data={transactions}
						keyExtractor={item => item.id}
						renderItem={({item}) => <TransactionCard data={item} />}

					/>
				</Transactions>
			</>}
		</Container>
	)
}
