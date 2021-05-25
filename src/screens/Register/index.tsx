import React, { useState } from 'react';
import {
	Container,
	Form,
	Header,
	Title,
	Fields,
	TransactionTypes
} from './styles';

import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';



export function Register() {

	const [transactionType, setTransacionType] =useState('');

	function handleTransactionTypeSelect(type: 'up' | 'down'){
		setTransacionType(type);
	}
	return (
		<Container>
			<Header>
				<Title>
					Cadastro
				</Title>
			</Header>
			<Form>
				<Fields>
					<Input
						placeholder="Nome"
						/>
					<Input
						placeholder="Preço"
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
				</Fields>
				<Button title="Enviar"/>
			</Form>
		</Container>
	)
}
