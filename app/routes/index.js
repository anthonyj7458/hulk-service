import initMailRoutes from './mailRoutes';

const initRoutes = (app) => {
  app.use(`/mail`, initMailRoutes());
};

export default initRoutes;
