import { renderComponent } from "@/app/__tests__/test-utils"
import BuildingInfoModal from "../BuildingInfoModal";
import { fireEvent, screen } from "@testing-library/react-native";

describe('BuildingInfoModal', () => {
    let onClose: jest.Mock;
    const modalTitle = 'Modal Title';
    const description = 'This is a description of the modal content';
    const footerContent = <>This is an example of a footer element</>;

    beforeEach(async () => {
        onClose = jest.fn();
        await renderComponent(<BuildingInfoModal visible={true} 
            onClose={onClose} 
            title={modalTitle} 
            description={description} 
            footerContent={footerContent}/>);
    });
    test('Component renders', async () => {
        const modalTitleText = screen.getByText(modalTitle);
        expect(modalTitleText).toBeTruthy();
        expect(screen.getByText(description)).toBeTruthy();
        expect(screen.getByText('This is an example of a footer element')).toBeTruthy();
    });

    test('Close button calls onClose', async () => {
        const closeButton = screen.getByTestId('close-button');
        fireEvent.press(closeButton);
        expect(onClose).toHaveBeenCalled();
    });
});