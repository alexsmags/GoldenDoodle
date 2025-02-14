import { screen } from "@testing-library/react-native";
import App from "..";
import { renderComponent } from "./test-utils";

describe('App', () => {
    test('The app renders', async () => {
        await renderComponent(<App />);
        const defaultScreenText = screen.getByText('Welcome to Concordia Navigator');
        expect(defaultScreenText).toBeTruthy();
    });
});