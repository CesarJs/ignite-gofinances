import React from 'react';

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
	LogoutButton
 } from './styles';

 export interface DataListProps extends TransactionCardProps {
	 id: string;
 }
export function Dashboard(){
	const data: DataListProps[] = [
		{
			id: "1",
			type: 'positive',
			title: "Desenvolvimento de sites",
			amount: "R$ 12.000,00",
			date: "13/02/2021",
			category:{
				name: "Vendas",
				icone: "dollar-sign"
			}
		},
		{
			id: "2",
			type: 'negative',
			title: "Hamburgueria Pizzy",
			amount: "R$ 59,00",
			date: "10/04/2020",
			category:{
				name: "Alimentação",
				icone: "coffee"
			}
		},
		{
			id: "3",
			type: 'negative',
			title: "Aluguel do apartamento",
			amount: "R$ 1.200,00",
			date: "27/03/2020",
			category:{
				name: "Casa",
				icone: "home"
			}
		}
	];
	return(
		<Container>
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
					amount="R$ 17.400,00"
					lastTransacion="Última entrada dia 13 de abril"
					type="up"
					/>
				<HighLightCard
					title="Saídas"
					amount="R$ 1.589,00"
					lastTransacion="Última saida dia 03 de abril"
					type="down"
					/>
				<HighLightCard
					title="Total"
					amount="R$ 16.141,00"
					lastTransacion="01 à 116 de abril"
					type="total"
					/>
			</HighLightCards>
			<Transactions>
				<Title>Listagem </Title>
				<TransactionList
					data={data}
					keyExtractor={item => item.id}
					renderItem={({item}) => <TransactionCard data={item} />}

				/>
			</Transactions>
		</Container>
	)
}
