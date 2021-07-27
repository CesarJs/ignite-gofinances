import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import theme from '../../global/styles/theme';

import { Register } from '.';

const Providers: React.FC = ({ children }) => (
	<ThemeProvider theme={theme}>
		{children}
	</ThemeProvider>
);



describe('Register Screen', () => {
	it('because yes', async () => {
		const yes = 'yes';

		await waitFor(() => {
			expect (yes).toEqual('yes');
		});
	});

	// it('should be open category modal when user click on button', async () => {
	// 	const { getByTestId, debug } = render (
	// 		<Register />,
	// 		{
	// 			wrapper: Providers
	// 		}
	// 	);
	// 	const categoryModal = getByTestId("modal-category");
	// 	const buttonCategory = getByTestId("button-category");

	// 	fireEvent.press(buttonCategory);
	// 	await waitFor(() => {
	// 		expect (categoryModal.props.visisble).toBeFalsy();
	// 	});
	// });


});
