import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  ProgressTracker: {
    position: 'absolute',
    top: '-8rem',
    right: '-8rem',
    backgroundColor: '#668d3c',
    borderRadius: '50%',
    height: '20rem',
    width: '20rem'
  },

  stats: {
    position: 'absolute',
    top: '50%',
    left: '15%',
    color: 'white',
    fontSize: '1.4rem',
    fontFamily: 'sans-serif',
    // prettier-ignore
    '& :first-child': {
      marginBottom: '1rem'
    }
  }
});

const ProgressTracker = ({ rank, level }) => {
  const classes = useStyles();
  return (
    <div className={classes.ProgressTracker}>
      <div className={classes.stats}>
        <h3>{rank}</h3>
        <h3>Level: {level}</h3>
      </div>
    </div>
  );
};

export default ProgressTracker;
