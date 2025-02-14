import { renderComponent } from "@/app/__tests__/test-utils"
import Header from "../Header"

test('header component renders correctly', () => {
    renderComponent(<Header />);
})