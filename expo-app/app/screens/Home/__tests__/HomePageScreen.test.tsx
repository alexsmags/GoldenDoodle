import { renderComponent } from "@/app/__tests__/test-utils";
import HomePageScreen from "../HomePageScreen";

test('HomePageScreen component renders correctly', () => {
    renderComponent(<HomePageScreen />);
});