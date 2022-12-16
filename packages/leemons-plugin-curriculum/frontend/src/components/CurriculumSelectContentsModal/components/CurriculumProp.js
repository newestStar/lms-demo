/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Badge,
  Box,
  Checkbox,
  InputWrapper,
  Stack,
  TAGIFY_TAG_REGEX,
  Text,
  Title,
} from '@bubbles-ui/components';
import _, { forEach, forIn, isArray, isNil, isObject, isPlainObject } from 'lodash';
import { ParentRelation } from '@curriculum/components/FormTheme/ParentRelation';
import { getTagRelationSelectData } from '@curriculum/components/FormTheme/TagRelation';
import { getItemTitleNumberedWithParents } from '@curriculum/helpers/getItemTitleNumberedWithParents';
import { htmlToText } from '@common';

function NewValue({
  keyIndex,
  blockData,
  nodeLevelId,
  baseValue,
  nodeId,
  hideNoSelecteds,
  showCheckboxs,
  store,
  value,
  render,
  onParentNumbering,
  baseValueId,
}) {
  const key = `curriculum.${store.curriculum.id}|nodeLevel.${
    nodeLevelId || store.selectedNode.nodeLevel
  }|node.${nodeId || store.selectedNode.id}|property.${baseValueId}`;

  const flatNodes = React.useMemo(() => {
    const result = [];

    function flatten(childrens) {
      _.forEach(childrens, (child) => {
        result.push(child);
        if (_.isArray(child.childrens)) {
          flatten(child.childrens);
        }
      });
    }

    flatten(store.curriculum.nodes);
    return result;
  }, [store.curriculum]);

  const tags = React.useMemo(() => {
    const results = [];
    if (value.metadata?.tagRelated?.length) {
      const tagValues = getTagRelationSelectData(
        store.curriculum,
        blockData,
        store.selectedNode.id
      );
      const tagValuesByValue = _.keyBy(tagValues, 'value');
      forEach(value.metadata.tagRelated, (tag) => {
        if (tagValuesByValue[tag]) {
          results.push(tagValuesByValue[tag].label);
        }
      });
    }
    return results.map((tag, index) => (
      <Box key={index} sx={(theme) => ({ margin: theme.spacing[1], display: 'inline-block' })}>
        <Badge color="stroke" closable={false} label={tag} />
      </Box>
    ));
  }, [value, flatNodes]);

  function onChange(id) {
    if (!isArray(store.value)) store.value = [];
    const index = store.value.indexOf(id);
    if (index >= 0) {
      store.value.splice(index, 1);
    } else {
      store.value.push(id);
    }
    render();
  }

  function getNumbering(index, item, v) {
    const va = v || value;
    onParentNumbering(
      getItemTitleNumberedWithParents(
        store.curriculum,
        blockData,
        nodeId,
        {
          ...va,
          metadata: {
            ...va?.metadata,
            parentRelated: baseValue?.metadata?.parentRelated || va?.metadata?.parentRelated,
          },
        },
        index,
        item,
        true
      )
    );
    return getItemTitleNumberedWithParents(
      store.curriculum,
      blockData,
      nodeId,
      {
        ...va,
        metadata: {
          ...va?.metadata,
          parentRelated: baseValue?.metadata?.parentRelated || va?.metadata?.parentRelated,
        },
      },
      index,
      item
    );
  }

  function CheckBoxComponent(id, item, title, label) {
    return (
      <Box>
        <Stack fullWidth alignItems="start">
          {showCheckboxs ? (
            <Checkbox checked={store.value?.indexOf(id) >= 0} onChange={() => onChange(id)} />
          ) : null}
          <Stack sx={() => ({ marginTop: 6 })} alignItems="center">
            {item.metadata?.index ? (
              <Text role="productive" color="primary" strong>{`${item.metadata?.index}`}</Text>
            ) : null}
            <Box sx={(theme) => ({ flex: 1 })}>
              <Text
                strong
                color="primary"
                role="productive"
                dangerouslySetInnerHTML={{
                  __html: title || label || item.value,
                }}
              />
            </Box>
          </Stack>
        </Stack>
        {title ? (
          <Box
            sx={(theme) => ({
              paddingLeft: theme.spacing[2],
              marginTop: -2,
              marginBottom: theme.spacing[1],
            })}
          >
            <Text
              role="productive"
              dangerouslySetInnerHTML={{
                __html: label || item.value,
              }}
            />
          </Box>
        ) : null}
      </Box>
    );
  }

  function getGroupItem(itemId) {
    return _.find(blockData.elements, { id: itemId });
  }

  function getGroupTitle(itemId) {
    let finalText = blockData.showAs;
    let array;
    const item = getGroupItem(itemId);
    // eslint-disable-next-line no-cond-assign
    while ((array = TAGIFY_TAG_REGEX.exec(blockData.showAs)) !== null) {
      const json = JSON.parse(array[0])[0][0];
      finalText = finalText.replace(array[0], item[json.id]);
    }
    return finalText;
  }

  function isInValues(id) {
    let hi = false;
    _.forEach(store.value, (sv) => {
      if (sv.indexOf(id) >= 0) {
        hi = true;
        return false;
      }
    });
    return hi;
  }

  if (isObject(value)) {
    if (value.id) {
      // Listado
      return (
        <Box>
          {CheckBoxComponent(
            `${key}|value.${value.id}`,
            value,
            undefined,
            `${getNumbering(keyIndex, null, baseValue)} ${htmlToText(value.value)}`
          )}
          <Box sx={(theme) => ({ paddingLeft: theme.spacing[8] })}>{tags}</Box>
        </Box>
      );
    }
    // Grupo
    const toReturn = [];
    forIn(value, (val, k) => {
      const checks = [];
      if (isArray(val.value)) {
        const che = [];
        forEach(val.value, (v, i) => {
          let canAdd = true;
          if (hideNoSelecteds) {
            if (!isInValues(v.id)) {
              canAdd = false;
            }
          }
          if (canAdd)
            che.push(
              CheckBoxComponent(
                `${key}|value.${val.id}|value2.${v.id}`,
                v,
                undefined,
                getNumbering(i, getGroupItem(k), val)
              )
            );
        });
        checks.push(
          <Box sx={(theme) => ({ marginTop: theme.spacing[4] })}>
            <Text
              strong
              color="primary"
              role="productive"
              dangerouslySetInnerHTML={{
                __html: getGroupTitle(k),
              }}
            />
            {che}
          </Box>
        );
      } else {
        let canAdd = true;
        if (hideNoSelecteds) {
          if (!isInValues(val.id)) {
            canAdd = false;
          }
        }
        if (canAdd) checks.push(CheckBoxComponent(`${key}|value.${val.id}`, val, getGroupTitle(k)));
      }
      toReturn.push(
        <Box>
          {checks}
          {tags}
        </Box>
      );
    });
    return toReturn;
  }
  // Texto
  return (
    <Box>
      {CheckBoxComponent(key, value)}
      {tags}
    </Box>
  );
}

NewValue.propTypes = {
  value: PropTypes.any,
  store: PropTypes.object,
  render: PropTypes.func,
  nodeId: PropTypes.string,
  baseValue: PropTypes.any,
  blockData: PropTypes.any,
  keyIndex: PropTypes.any,
  hideNoSelecteds: PropTypes.bool,
  nodeLevelId: PropTypes.string,
  baseValueId: PropTypes.string,
  showCheckboxs: PropTypes.bool,
};

// eslint-disable-next-line import/prefer-default-export
export function CurriculumProp({ hideNoSelecteds, t2, store, render, item, showCheckboxs = true }) {
  const [parentNumber, setParentNumber] = React.useState();
  const [parentProperty, setParentProperty] = React.useState(null);

  let values;
  if (store.selectedNode?.formValues) {
    values = store.selectedNode?.formValues[item.id];
  }

  const hide = React.useMemo(() => {
    if (hideNoSelecteds) {
      let hi = true;
      if (isPlainObject(values?.value)) {
        _.forIn(values?.value, ({ id }) => {
          _.forEach(store.value, (sv) => {
            if (sv.indexOf(id) >= 0) {
              hi = false;
              return false;
            }
          });
        });
      } else if (isArray(values?.value)) {
        _.forEach(values?.value, ({ id }) => {
          _.forEach(store.value, (sv) => {
            if (sv.indexOf(id) >= 0) {
              hi = false;
              return false;
            }
          });
          if (!hi) return false;
        });
      } else {
        _.forEach(store.value, (sv) => {
          if (sv.indexOf(values?.value.id) >= 0) {
            hi = false;
            return false;
          }
        });
      }
      return hi;
    }
    return false;
  }, [store.value]);

  function onParentFound(show, { property } = {}) {
    if (show && property) setParentProperty(property);
  }

  function onParentNumbering(e) {
    if (parentNumber !== e) {
      setParentNumber(e);
    }
  }

  function newArrayValues() {
    return values?.value.map((value, index) => {
      if (hideNoSelecteds) {
        let hi = true;
        _.forEach(store.value, (sv) => {
          if (sv.indexOf(value.id) >= 0) {
            hi = false;
            return false;
          }
        });
        if (hi) return null;
      }
      return (
        <NewValue
          key={index}
          keyIndex={index}
          render={render}
          store={store}
          baseValueId={values.id}
          value={value}
          baseValue={values}
          hideNoSelecteds={hideNoSelecteds}
          nodeId={values._nodeId}
          nodeLevelId={values._nodeLevelId}
          blockData={values.blockData || item.frontConfig.blockData}
          onParentNumbering={(e) => {
            if (index === 0) onParentNumbering(e);
          }}
          showCheckboxs={showCheckboxs}
        />
      );
    });
  }

  function newValues() {
    if (hideNoSelecteds) {
      let hi = true;
      if (!isPlainObject(values.value)) {
        _.forEach(store.value, (sv) => {
          if (sv.indexOf(values.value.id) >= 0) {
            hi = false;
            return false;
          }
        });
      } else {
        hi = false;
      }
      if (hi) return null;
    }
    return (
      <NewValue
        render={render}
        store={store}
        baseValueId={values.id}
        baseValue={values}
        value={values.value}
        nodeId={values._nodeId}
        hideNoSelecteds={hideNoSelecteds}
        nodeLevelId={values._nodeLevelId}
        blockData={values.blockData || item.frontConfig.blockData}
        onParentNumbering={onParentNumbering}
        showCheckboxs={showCheckboxs}
      />
    );
  }

  if (hide) return null;

  return (
    <Box sx={(theme) => ({ marginTop: theme.spacing[2] })}>
      <InputWrapper
        label={
          <Title
            order={6}
            sx={(theme) => ({ marginTop: theme.spacing[2], marginBottom: theme.spacing[2] })}
          >
            {parentProperty ? `${parentProperty.title} & ` : ''}
            {item.title}
          </Title>
        }
      >
        {isNil(values) ? (
          '-'
        ) : (
          <>
            <ParentRelation
              curriculum={store.curriculum}
              blockData={values.blockData || item.frontConfig.blockData}
              value={values}
              onChange={() => {}}
              isShow={onParentFound}
              isEditMode={false}
              id={values._nodeId || store.selectedNode.id}
              hideLabel
              numbering={parentNumber}
              t={t2}
            >
              {isArray(values.value) ? newArrayValues() : newValues()}
            </ParentRelation>
          </>
        )}
      </InputWrapper>
    </Box>
  );
}

CurriculumProp.propTypes = {
  store: PropTypes.object,
  render: PropTypes.func,
  item: PropTypes.object,
  showCheckboxs: PropTypes.bool,
  t2: PropTypes.func,
  hideNoSelecteds: PropTypes.bool,
};
