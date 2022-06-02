import React from 'react';
import {
  ActivityAccordion,
  ActivityAccordionPanel,
  ActivityAnswersBar,
  Badge,
  Box,
  Button,
  ContextContainer,
  ImageLoader,
  PageContainer,
  useAccordionState,
} from '@bubbles-ui/components';
import { AdminPageHeader } from '@bubbles-ui/leemons';
import useTranslateLoader from '@multilanguage/useTranslateLoader';
import prefixPN from '@tests/helpers/prefixPN';
import { useStore } from '@common';
import { useHistory, useParams } from 'react-router-dom';
import { addErrorAlert } from '@layout/alert';
import { ChevronRightIcon, PluginTestIcon } from '@bubbles-ui/icons/outline';
import { forEach, keyBy } from 'lodash';
import { getProgramEvaluationSystemRequest } from '@academic-portfolio/request';
import { getTestRequest } from '../../../request';
import QuestionsTable from './components/QuestionsTable';
import { questionTypeT } from '../questions-banks/components/QuestionForm';
import ViewModeQuestions from '../../../components/ViewModeQuestions';
import { ResultStyles } from './Result.style';
import { calculeInfoValues } from './StudentInstance/helpers/calculeInfoValues';

export default function Detail() {
  const [t, t1V] = useTranslateLoader(prefixPN('testsDetail'));
  const [t2, t2V] = useTranslateLoader(prefixPN('questionsBanksDetail'));
  const { classes: styles, cx } = ResultStyles({}, { name: 'Detail' });

  const [store, render] = useStore({
    loading: true,
    isNew: false,
    currentStep: 0,
  });

  const [accordionState, accordionFunctions] = useAccordionState({ initialState: {} });

  const history = useHistory();
  const params = useParams();

  function getStats() {
    const selectables = [];
    const data = [];

    if (store.test?.questions) {
      let category = false;
      let type = false;
      const categoriesById = keyBy(store.test.questionBank.categories, 'id');
      forEach(store.test.questions, (question) => {
        const d = {
          id: question.id,
          status: null,
        };
        if (question.category) {
          category = true;
          d.category = categoriesById[question.category].value;
        } else {
          d.category = t('undefined');
        }
        if (question.type) {
          type = true;
          d.type = t2(questionTypeT[question.type]);
        } else {
          d.type = t('undefined');
        }
        data.push(d);
      });
      if (category) {
        selectables.push({
          value: 'category',
          label: t('categories'),
        });
      }
      if (type) {
        selectables.push({
          value: 'type',
          label: t('questionTypes'),
        });
      }
    }
    return { selectables, data, labels: { OK: t('ok'), KO: t('ko'), null: t('nsnc') } };
  }

  async function init() {
    try {
      const { test } = await getTestRequest(params.id, { withQuestionBank: true });
      const { evaluationSystem } = await getProgramEvaluationSystemRequest(test.program);
      store.test = test;
      store.stats = getStats();
      store.test.questionResponses = {};
      forEach(store.test.questions, ({ id }) => {
        store.test.questionResponses[id] = {
          clues: 0,
          points: 0,
          status: null,
        };
      });
      store.test.questionsInfo = calculeInfoValues(
        store.test.questions.length,
        evaluationSystem.maxScale.number,
        evaluationSystem.minScale.number,
        evaluationSystem.minScaleToPromote.number
      );
      store.evaluationSystem = evaluationSystem;
      render();
    } catch (error) {
      console.log(error);
      addErrorAlert(error);
    }
  }

  function goAssignPage() {
    history.push(`/private/tests/assign/${store.test.id}`);
  }

  function goEditPage() {
    history.push(`/private/tests/${store.test.id}`);
  }

  function toggleQuestionMode() {
    store.useQuestionMode = !store.useQuestionMode;
    render();
  }

  React.useEffect(() => {
    if (params?.id && t1V && t2V) init();
  }, [params, t1V, t2V]);

  const accordion = [];
  if (store.stats?.data.length && store.stats?.selectables.length) {
    accordion.push(
      <ActivityAccordionPanel
        key={1}
        label={t('chartLabel')}
        icon={
          <Box style={{ position: 'relative', width: '23px', height: '23px' }}>
            <ImageLoader className="stroke-current" src={'/public/tests/test-results-icon.svg'} />
          </Box>
        }
        color="solid"
      >
        <Box p={20}>
          <ActivityAnswersBar withLegend={false} {...store.stats} />
        </Box>
      </ActivityAccordionPanel>
    );
  }
  if (store.test) {
    accordion.push(
      <ActivityAccordionPanel
        key={2}
        label={t('questions')}
        rightSection={
          <Box>
            <Badge
              label={store.test?.questions?.length}
              size="md"
              color="stroke"
              closable={false}
            />
          </Box>
        }
        icon={
          <Box style={{ position: 'relative', width: '22px', height: '24px' }}>
            <ImageLoader className="stroke-current" src={'/public/tests/questions-icon.svg'} />
          </Box>
        }
      >
        <Box>
          {store.useQuestionMode ? (
            <ViewModeQuestions viewMode={false} store={store.test} onReturn={toggleQuestionMode} />
          ) : (
            <>
              <Box className={styles.showTestBar}>
                <Button rounded rightIcon={<ChevronRightIcon />} onClick={toggleQuestionMode}>
                  {t('showInTests')}
                </Button>
              </Box>
              <QuestionsTable withStyle hideCheckbox questions={store.test?.questions} />
            </>
          )}
        </Box>
      </ActivityAccordionPanel>
    );
  }

  return (
    <ContextContainer
      sx={(theme) => ({
        backgroundColor: theme.colors.uiBackground02,
        paddingBottom: theme.spacing[12],
        overflow: 'auto',
      })}
      fullHeight
      fullWidth
    >
      <AdminPageHeader
        values={{
          title: store.test?.name,
        }}
        buttons={{
          duplicate: t('edit'),
          edit: t('assign'),
        }}
        icon={<PluginTestIcon />}
        variant="teacher"
        onDuplicate={() => goEditPage()}
        onEdit={() => goAssignPage()}
      />

      <PageContainer noFlex>
        <Box sx={(theme) => ({ paddingBottom: theme.spacing[12] })}>
          <ActivityAccordion
            state={accordionState}
            onChange={(e) => {
              accordionFunctions.setState(e);
            }}
          >
            {accordion}
          </ActivityAccordion>
        </Box>
      </PageContainer>
    </ContextContainer>
  );
}
