import { useEffect } from 'react';
import PropTypes from 'prop-types';
import useListLevelSchema from '../../../../hooks/levelschema/useListLevelSchema';
import Tree from '../../../common/tree';

function findEntity(id, entities) {
  return entities.find(({ id: entityId }) => entityId === id);
}

export default function TreeAdmin({
  locale = 'en',
  onDetails = () => {},
  onEdit = () => {},
  onAdd = () => {},
  setUpdate = () => {},
}) {
  // Get the DB LevelSchemas
  const [levelSchemas, , levelSchemasError, levelSchemasLoading, update] = useListLevelSchema(
    locale
  );

  // Give the update function to the parent
  useEffect(() => {
    setUpdate(update);
  }, []);

  return (
    <div className="tree_editWrapper flex-1 my-2 mb-2">
      {(() => {
        if (levelSchemasError) {
          return <p>{levelSchemasError.message}</p>;
        }
        if (!levelSchemas && levelSchemasLoading) {
          return <p>Loading ...</p>;
        }
        return (
          <Tree
            entities={levelSchemas}
            onSelect={(node, toggle) => {
              toggle();
              if (node.properties.editable !== false) {
                onEdit(findEntity(node.id, levelSchemas));
              } else {
                onDetails(findEntity(node.id, levelSchemas));
              }
            }}
            onAdd={(node) => onAdd(node.data.parent)}
          />
        );
      })()}
    </div>
  );
}

TreeAdmin.propTypes = {
  locale: PropTypes.string,
  onDetails: PropTypes.func,
  onEdit: PropTypes.func,
  onAdd: PropTypes.func,
  setUpdate: PropTypes.func,
};
