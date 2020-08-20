import app from './app';
import globalVars from './models/globalVars';

const PORT = globalVars.port || 8013;

app.listen(PORT, () => {
  console.log('Express server listening on port ' + PORT);
});
