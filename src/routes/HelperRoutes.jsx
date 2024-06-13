import { lazy } from "react";
import Loadable from "components/common/Loadable";
import { RoutePath } from "src/utils/routes";
import MinimalLayout from "../layouts/MinimalLayout";

// testroute
const StoryPopUp = Loadable(
  lazy(() => import("components/ui-components/StoryPopUp"))
);

// MAIN ROUTES

const HelperRoutes = () => {
  return {
    path: RoutePath.HOME,
    element: <MinimalLayout />,
    children: [
      {
        path: RoutePath.STORY,
        element: <StoryPopUp />,
      },
    ],
  };
};

export default HelperRoutes;
