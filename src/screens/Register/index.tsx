import React, { useState, useEffect } from 'react';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';

import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

import { InputForm } from '../../components/Form/InputForm';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';

import { CategorySelect } from '../CategorySelect';

import {
	Container,
	Form,
	Header,
	Title,
	Fields,
	TransactionTypes
} from './styles';

interface FormData{
	name: string;
	amount: string;
}
const schema = Yup.object().shape({
	name: Yup
	.string()
	.required('Nome é obrigatório!'),
	amount: Yup
	.number()
	.typeError('Informe um valor númerico!')
	.positive('O valor não pode ser negativo!')
	.required('Você precisa informar o valor!')
});
export function Register() {
	const dataKey = '@gofinacen:transacations';
	const [ transactionType, setTransacionType] = useState('');
	const [ showModal, setShowModal ] = useState(false);

	const [ category, setCategory ] = useState({
		key: 'category',
		name: 'Categoria'
	});
	const navigation = useNavigation();
	const {
		control,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm({
		resolver: yupResolver(schema)
	});

	function resetForm() {
		setTransacionType('');
		setCategory({
			key: 'category',
			name: 'Categoria'
		});
		reset();
	}
	function handleTransactionTypeSelect(type: 'up' | 'down'){
		setTransacionType(type);
	}
	function handleOpenSelectCategoryModal(){
		setShowModal(true);
	}
	function handleCloseSelectCategoryModal(){
		setShowModal(false);
	}

	async function handleRegister(form: FormData){
		if(!transactionType){
			return Alert.alert('Selecione o tipo da transação !');
		}
		if(category.key === 'category'){
			return Alert.alert('Selecione a categoria !');
		}
		const newData = {
			id: String(uuid.v4()),
			name: form.name,
			amount: form.amount,
			transactionType,
			category: category.key,
			date: new Date()
		}
		try {

			const data = await AsyncStorage.getItem(dataKey);
			const currentData = data ? JSON.parse(data) : [];
			const dataFormatted = [

				...currentData,
				newData
			];

			await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

			resetForm();
			navigation.navigate("Listagem");
		} catch (error) {
			console.log(error);
			Alert.alert('Não foi possível salvar');
		}
	}

	useEffect(() => {
		// async function loadData(){
		// 	try {
		// 		const currentData = await AsyncStorage.getItem(dataKey);
		// 		console.log(JSON.parse(currentData!));
		// 	} catch (error) {
		// 		console.log(error);
		// 		Alert.alert("Não foi possivel carregar as informações, tente novamente.");
		// 	}

		// }
		// loadData();

		// async function deleteData(){
		// 	const currentData = await AsyncStorage.getItem(dataKey);
		// 	if(currentData){
		// 		try {
		// 			await AsyncStorage.removeItem(dataKey);
		// 		} catch (error) {
		// 			console.log(error);
		// 			Alert.alert('Não foi possivel deletar, por favor tente novamente!');
		// 		}
		// 	}
		// }

		// deleteData();
	});
	return (
		<TouchableWithoutFeedback
			onPress={Keyboard.dismiss}
		>
			<Container>
					<Header>
						<Title>
							Cadastro
						</Title>

					</Header>
					<Form>
						<Fields>
							<InputForm
								name="name"
								control={control}
								placeholder="Nome"
								autoCapitalize="sentences"
								autoCorrect={false}
								error={errors.name && errors.name.message}
								/>
							<InputForm
								name="amount"
								control={control}
								placeholder="Preço"
								keyboardType="numeric"
								error={errors.amount && errors.amount.message}
								/>
							<TransactionTypes>
								<TransactionTypeButton
									isActive={transactionType === 'up'}
									type="up"
									title="Income"
									onPress={() => handleTransactionTypeSelect('up')}
									/>
								<TransactionTypeButton
									isActive={transactionType === 'down'}
									type="down"
									title="Outcome"
									onPress={() => handleTransactionTypeSelect('down')}
									/>
							</TransactionTypes>

							<CategorySelectButton
								title={category.name}
								onPress={handleOpenSelectCategoryModal}
							/>
						</Fields>
						<Button
							title="Enviar"
							onPress={handleSubmit(handleRegister)}
						/>
					</Form>
					<Modal  visible={showModal}>
						<CategorySelect
							category={category}
							setCategory={setCategory}
							closeSelectCategory={handleCloseSelectCategoryModal}
						/>
					</Modal>
			</Container>
		</TouchableWithoutFeedback>
	)
}
