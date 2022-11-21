import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  ContextContainer,
  HtmlText,
  ImageLoader,
  TabPanel,
  Tabs,
  Title,
} from '@bubbles-ui/components';
import { CurriculumListContents } from '@curriculum/components/CurriculumListContents';
import { useClassesSubjects } from '@academic-portfolio/hooks';
import prepareAsset from '@leebrary/helpers/prepareAsset';
import { useQuery } from '@tanstack/react-query';
import { getAssetsByIdsRequest } from '@leebrary/request';

function CurriculumRender({ assignation, showCurriculum: showCurriculumObj, labels }) {
  const curriculumKeysToShow = Object.entries(showCurriculumObj)
    .filter(([, value]) => value)
    .map(([key]) => key);

  const showCurriculum = curriculumKeysToShow?.length > 0;

  if (!showCurriculum) {
    return null;
  }

  const { instance } = assignation;
  const { assignable } = instance;

  const curriculumValuesToShow = assignable.subjects.map((subject) => {
    const curriculum = {};

    if (curriculumKeysToShow.includes('objectives')) {
      curriculum.objectives = subject.curriculum.objectives;
    }

    if (subject.curriculum.curriculum) {
      curriculum.curriculum = subject.curriculum.curriculum.filter((key) => {
        const regex = new RegExp(`${curriculumKeysToShow.join('|')}`, 'i');
        return regex.test(key);
      });
    }
    return {
      ...subject,
      curriculum,
    };
  });

  const subjects = useClassesSubjects(instance.classes);

  return (
    <ContextContainer>
      <Title order={4} color="primary">
        {labels?.title}
      </Title>
      <Tabs>
        {subjects.map(({ id, name }) => {
          const { curriculum } = curriculumValuesToShow.find((s) => s.subject === id);
          const tabPanelStyle = (theme) => ({ marginLeft: theme.spacing[3] });
          return (
            <TabPanel key={id} label={name}>
              {/*
                EN: Box to add margin
                ES: Box para agregar margen
              */}
              <Box sx={(theme) => ({ marginTop: theme.spacing[4] })} />

              <Box
                sx={(theme) => ({
                  display: 'flex',
                  flexDirection: 'column',
                  gap: theme.spacing[4],
                })}
              >
                {curriculum?.curriculum?.length && (
                  <Box sx={tabPanelStyle}>
                    <Box>
                      <CurriculumListContents value={curriculum?.curriculum} />
                    </Box>
                  </Box>
                )}
                {!!curriculumKeysToShow.includes('objectives') && !!curriculum?.objectives?.length && (
                  <Box sx={tabPanelStyle}>
                    <Box>
                      <Title color="primary" order={5}>
                        {labels?.objectives}
                      </Title>
                      {/* TODO: Use react lists */}
                      <HtmlText>
                        {`
                      <ul>
                      ${curriculum?.objectives
                        ?.map(
                          (objective) =>
                            `<li>
                            ${objective}
                          </li>`
                        )
                        ?.join('')}
                      </ul>
                    `}
                      </HtmlText>
                    </Box>
                  </Box>
                )}
              </Box>
            </TabPanel>
          );
        })}
      </Tabs>
    </ContextContainer>
  );
}

CurriculumRender.propTypes = {
  assignation: PropTypes.object.isRequired,
  showCurriculum: PropTypes.object.isRequired,
  labels: PropTypes.object.isRequired,
};

function useSupportImage(assignable) {
  const query = useQuery(
    ['asset', { id: assignable?.metadata?.leebrary?.statementImage?.[0] }],
    () =>
      getAssetsByIdsRequest([assignable?.metadata?.leebrary?.statementImage?.[0]], {
        indexable: false,
        showPublic: true,
      })
        .then((response) => response.assets[0])
        .then((asset) => (asset ? prepareAsset(asset) : asset)),
    { enabled: !!assignable?.metadata?.leebrary?.statementImage?.[0] }
  );

  return query;
}

export default function StatementStep({ assignation, localizations: _labels }) {
  const labels = _labels.statement_step;

  const { instance } = assignation;
  const { assignable } = instance;

  const { data: supportImage } = useSupportImage(assignable);

  const showCurriculum = instance.curriculum;
  const isGradable = assignable.gradable;

  return (
    <ContextContainer>
      <ContextContainer>
        <Title order={2} color="primary">
          {isGradable ? labels?.statement : labels?.presentation}
        </Title>
        <HtmlText>{assignable?.statement}</HtmlText>
        {!!supportImage && <ImageLoader src={supportImage.url} height="auto" />}
      </ContextContainer>
      <CurriculumRender
        assignation={assignation}
        showCurriculum={showCurriculum}
        labels={labels?.curriculum}
      />
    </ContextContainer>
  );
}

StatementStep.propTypes = {
  assignation: PropTypes.shape({
    instance: PropTypes.shape({
      curriculum: PropTypes.shape({
        content: PropTypes.bool,
        assessmentCriteria: PropTypes.bool,
        objectives: PropTypes.bool,
      }),
      assignable: PropTypes.shape({
        statement: PropTypes.string,
        curriculum: PropTypes.shape({
          content: PropTypes.arrayOf(PropTypes.string),
          assessmentCriteria: PropTypes.arrayOf(PropTypes.string),
          objectives: PropTypes.arrayOf(PropTypes.string),
        }),
      }),
    }),
  }),
  labels: PropTypes.shape({
    statement_step: PropTypes.object,
  }),
};
