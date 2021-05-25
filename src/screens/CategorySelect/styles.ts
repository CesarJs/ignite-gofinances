import styled, {css} from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacityProps } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface CategoryProps extends TouchableOpacityProps{
	isActive: boolean;
}

export const Container = styled(GestureHandlerRootView)`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.backgorund};
`;

export const Header = styled.View`
	width: 100%;
	height: ${RFValue(113)}px;
	background-color: ${({ theme }) => theme.colors.primary};

	align-items: center;
	justify-content: flex-end;
	margin-bottom: 19px;

`;

export const Title = styled.Text`
	font-family: ${({ theme }) => theme.fonts.regular};
	color: ${({ theme }) => theme.colors.shape};
	font-size: ${RFValue(18)}px;
`;


export const Category = styled.TouchableOpacity<CategoryProps>`
	width: 100%;
	padding: ${RFValue(15)}px;
	flex-direction: row;
	align-items: center;

	background-color: ${({isActive, theme}) => isActive ? theme.colors.secondary_linght : theme.colors.backgorund }


`;
export const Icon = styled(Feather)`
	font-size: ${RFValue(20)}px;
	margin-left: 16px;
`;
export const Name = styled.Text`
	font-family: ${({ theme }) => theme.fonts.regular};
	font-size: ${RFValue(14)}px;
`;
export const Separator = styled.View`
	height: 1px;
	width: 100%;
	background-color: ${({ theme }) => theme.colors.text};
`;


export const Footer = styled.View`
	width: 100%;
	padding: 24px;
`;


