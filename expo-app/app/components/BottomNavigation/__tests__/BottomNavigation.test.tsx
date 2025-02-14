import { findElement, flush, renderComponent } from "@/app/__tests__/test-utils";
import BottomNavigation from "../BottomNavigation";
import { fireEvent, render, RenderResult } from "@testing-library/react-native";

describe('BottomNavigation', () => {
    describe('Tab Navigation', () => {
        test('clicking on a tab should change the active tab', async () => {
            await renderComponent(<BottomNavigation />);
            const servcesTab = findElement('tab-Services');
            fireEvent.press(servcesTab);
        });
    });
});