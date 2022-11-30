import Article from '../views/article';
import Home from '../views/home';
import { MapView } from '../views/map';
import Maps from '../views/maps';
import Mind from '../views/mind';
import Snippets from '../views/snippets';

export const routes = [
  {
    pattern: '/',
    element: <Home />,
  },
  {
    pattern: '/snippets',
    element: <Snippets />,
  },
  {
    pattern: '/maps',
    element: <Maps />,
  },
  {
    pattern: '/map/:id',
    element: <MapView />,
  },
  {
    pattern: '/post/:id',
    element: <Article />,
  },
  {
    pattern: '/snippet/:id',
    element: <Article />,
  },
  {
    pattern: '/mind/:postId',
    element: <Mind />,
  },
];
