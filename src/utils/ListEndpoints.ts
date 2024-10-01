import expressListEndpoints from "express-list-endpoints";

export class ListEndpoints {
  getEndpoints(app: any, PORT: string) {
    const endpoints = expressListEndpoints(app);

    const getPath = endpoints
      .map((endpoint) => {
        return {
          method: endpoint.methods,
          routes: {
            path: `http://localhost:${PORT}${endpoint.path}`,
          },
        };
      })
      .map((path) => {
        return {
          method: path.method,
          path: path.routes.path,
        };
      });

    return console.table(getPath);
  }
}
