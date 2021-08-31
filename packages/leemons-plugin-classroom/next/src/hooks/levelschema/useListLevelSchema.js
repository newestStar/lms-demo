import { listLevelSchemas } from '../../services/levelSchemas';
import useAsync from '../request/useAsync';

function useListLevelSchema(locale) {
  return useAsync(() => listLevelSchemas(locale), locale);
}

export default useListLevelSchema;
