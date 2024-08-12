import "./App.css";
// instagram filter css
import "src/assets/css/instagramFilters.css";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";

// routing
import AppRouting from "routes";

// defaultTheme
import themes from "themes";

// project imports
import NavigationScroll from "layouts/NavigationScroll";
import { useSelector } from "react-redux";

// TEST COMPONENTS
import ViewPost from "components/ui-components/Popups/ViewPost";
import Comments from "components/ui-components/Popups/Comments";
import BottomSheet from "components/common/BottomSheet";
import ImageViewer from "components/ui-components/ImageViewer";
import CreatePost from "components/ui-components/Popups/CreatePost";
import ShareWindow from "./components/ui-components/Popups/ShareWindow";

function App() {
	const customization = useSelector((state) => state.customization);

	return (
		<StyledEngineProvider injectFirst>
			{/* theme provider */}
			<ThemeProvider theme={themes(customization)}>
				{/* mui css baseline */}
				<CssBaseline />
				{/* navigation Scroll component */}
				<NavigationScroll>
					{/* routes */}
					<AppRouting />
					{/* test comps */}
					{/* <ViewPost /> */}
					{/* <Comments /> */}
					{/* <CreatePost open={true} /> */}
					<ShareWindow />
				</NavigationScroll>
			</ThemeProvider>
		</StyledEngineProvider>
	);
}

export default App;
