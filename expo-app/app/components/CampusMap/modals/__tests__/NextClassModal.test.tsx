import { renderComponent } from "@/app/__tests__/test-utils";
import NextClassModal from "../NextClassModal";

describe('NextClassModal', () => {
    test('Component renders', async () => {
        const onClose = jest.fn();
        await renderComponent(<NextClassModal visible={true} onClose={onClose} fetchRouteWithDestination={jest.fn()} buildingData={[]} />);
    });
});