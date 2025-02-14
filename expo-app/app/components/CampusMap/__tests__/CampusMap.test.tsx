import { renderComponent } from "@/app/__tests__/test-utils";
import { render } from "@testing-library/react-native";
import CampusMap from "../CampusMap";

test('CampusMap renders', async () => {
    renderComponent(<CampusMap />);
});