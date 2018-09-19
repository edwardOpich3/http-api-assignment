const getXML = (request, response, parsedUrl) => {
  let responseXML;
  let status;

  switch (parsedUrl.pathname) {
    case '/success':
      responseXML = '<response>'
        + '<message>Request Successful</message>'
      + '</response>';
      status = 200;
      break;

    case '/badRequest':
      if (parsedUrl.query && parsedUrl.query.valid === 'true') {
        responseXML = '<response>'
            + '<message>Request contains the proper parameters</message>'
        + '</response>';
        status = 200;
      } else {
        responseXML = '<response>'
            + '<message>Valid query parameter missing</message>'
            + '<id>badRequest</id>'
        + '</response>';
        status = 400;
      }
      break;

    case '/unauthorized':
      if (parsedUrl.query && parsedUrl.query.loggedIn === 'yes') {
        responseXML = '<response>'
            + '<message>Authorization Successful</message>'
        + '</response>';
        status = 200;
      } else {
        responseXML = '<response>'
            + '<message>Not logged in</message>'
            + '<id>unauthorized</id>'
        + '</response>';
        status = 401;
      }
      break;

    case '/forbidden':
      responseXML = '<response>'
        + '<message>You cannot access this content</message>'
        + '<id>forbidden</id>'
      + '</response>';
      status = 403;
      break;

    case '/internal':
      responseXML = '<response>'
        + '<message>Something went wrong on our end</message>'
        + '<id>internalError</id>'
      + '</response>';
      status = 500;
      break;

    case '/notImplemented':
      responseXML = '<response>'
        + '<message>A get request for this page has not currently been implemented</message>'
        + '<id>notImplemented</id>'
      + '</response>';
      status = 501;
      break;

    default:
      responseXML = '<response>'
        + '<message>Resource Not Found</message>'
        + '<id>notFound</id>'
      + '</response>';
      status = 404;
      break;
  }

  response.writeHead(status, { 'Content-Type': 'text/xml' });
  response.write(responseXML);
  response.end();
};

const getJSON = (request, response, parsedUrl) => {
  let responseJSON;
  let status;

  switch (parsedUrl.pathname) {
    case '/success':
      responseJSON = {
        message: 'Request Successful',
      };
      status = 200;
      break;

    case '/badRequest':
      if (parsedUrl.query && parsedUrl.query.valid === 'true') {
        responseJSON = {
          message: 'Request contains the proper parameters',
        };
        status = 200;
      } else {
        responseJSON = {
          message: 'Valid query parameter missing',
          id: 'badRequest',
        };
        status = 400;
      }
      break;

    case '/unauthorized':
      if (parsedUrl.query && parsedUrl.query.loggedIn === 'yes') {
        responseJSON = {
          message: 'Authorization Successful',
        };
        status = 200;
      } else {
        responseJSON = {
          message: 'Not logged in',
          id: 'unauthorized',
        };
        status = 401;
      }
      break;

    case '/forbidden':
      responseJSON = {
        message: 'You cannot access this content',
        id: 'forbidden',
      };
      status = 403;
      break;

    case '/internal':
      responseJSON = {
        message: 'Something went wrong on our end',
        id: 'internalError',
      };
      status = 500;
      break;

    case '/notImplemented':
      responseJSON = {
        message: 'A get request for this page has not currently been implemented',
        id: 'notImplemented',
      };
      status = 501;
      break;

    default:
      responseJSON = {
        message: 'Resource Not Found',
        id: 'notFound',
      };
      status = 404;
      break;
  }

  const stringMessage = JSON.stringify(responseJSON);

  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(stringMessage);
  response.end();
};

module.exports.getJSON = getJSON;
module.exports.getXML = getXML;
