import { renderComponent } from "@/app/__tests__/test-utils";
import SearchBar from "../SearchBar";

test('SearchBar component renders correctly', () => {
    renderComponent(<SearchBar />);
});

test('input correctly returns relevant search results', () => {
    throw new Error('Functionality not yet implemented');
})