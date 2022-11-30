import { useEffect, useState } from 'react';
import { useLocation } from 'react-use';
import { NextRouter } from './next_router';
import { routes } from './routes';

const nextRouter = new NextRouter();

routes.forEach((route) => nextRouter.addRoute(route));

export default function Router() {
  const location = useLocation();
  const [children, setChildren] = useState<JSX.Element | null>(null);

  useEffect(() => {
    const currentRoute = nextRouter.getRoute(location.pathname ?? '');

    if (currentRoute) {
      setChildren(currentRoute.route.element);
    } else {
      // TODO: 404
    }
  }, [location]);

  return <>{children}</>;
}
