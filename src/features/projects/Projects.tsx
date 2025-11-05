import FeatureLayout from '../../shared/layouts/FeatureLayout';

const Projects = () => {
  return (
    <FeatureLayout
      title={'Projects'}
      actionButton={
        <button onClick={() => {}} className='actionButton'>
          + New project
        </button>
      }
    >
      Projects
    </FeatureLayout>
  );
};

export default Projects;
