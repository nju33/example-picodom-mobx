import jss from 'jss';
import preset from 'jss-preset-default';

jss.setup(preset());

const {classes} = jss.createStyleSheet({
  '@global': {
    body: {
      margin: 0
    },
    h2: {
      margin: 0
    },
    a: {
      color: 'inherit',
      textDecoration: 'none'
    }
  },
  body: {
    display: 'flex',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    background: '#f8f8f8'
  },
  app: {
    position: 'relative',
    height: '70vh',
    width: '450px',
    overflow: 'hidden',
    border: '1px solid #aaa',
    margin: '0 auto',
    borderRadius: '4px',
    background: '#f3f3f3',
    padding: '3em 0'
  },
  form: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    fontSize: '1.3em'
  },
  input: {
    boxSizing: 'border-box',
    borderWidth: '0 0 1px',
    boxSizing: 'border-box',
    padding: '.5em 6em .5em .75em',
    width: '100%',
    borderRadius: '4px 4px 0 0',
    background: '#fefefe',
    fontSize: 'inherit',
    outline: 'none',

    '&::placeholder': {
      color: '#aaa'
    }
  },
  textarea: {
    zIndex: 1,
    position: 'absolute',
    top: 'calc(100% - 1px)',
    left: 0,
    opacity: 0,
    height: 0,
    width: '100%',
    borderWidth: '0 0 1px',
    borderColor: '#ccc',
    boxSizing: 'border-box',
    background: '#fefefe',
    outline: 'none',
    fontSize: 'inherit',
    transition: 'height .2s cubic-bezier(0.6, 0.04, 0.98, 0.335)',
  },
  textareaActive: {
    opacity: 1,
    height: '30vh',
    padding: '.5em .75em',
  },
  button: {
    position: 'absolute',
    right: '.5em',
    bottom: '50%',
    transform: 'translateY(50%)',
    paddingLeft: '.5em',
    borderWidth: '0 0 0 1px',
    borderColor: '#ccc',
    background: 'transparent',
    fontSize: 'inherit',
    color: '#aaa',
    transition: '.2s cubic-bezier(0.455, 0.03, 0.515, 0.955)',
    cursor: 'pointer',
    outline: 'none',

    '&:hover': {
      color: '#555'
    }
  },
  deleteButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    opacity: '.5',
    transition: '.2s cubic-bezier(0.455, 0.03, 0.515, 0.955)',
    outline: 'none',

    '&:hover': {
      opacity: '1',
      color: '#cb1b45'
    }
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#333',
    height: '2em',
    color: '#fff'
  },
  taskList: {
    overflow: 'auto',
    height: 'calc(100% + 1em)',
    listStyle: 'none',
    padding: 0,
    margin: 0,
    fontSize: '1.15em'
  },
  taskItem: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'stretch',
    padding: '.5em .75em',
    background: '#fff',
    borderBottom: '1px solid #f8f8f8',

    '&:nth-child(even)': {
      background: '#f8f8f8',
      borderBottom: '1px solid #fff',
    }
  },
  taskButtons: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '.5em'
  },
  taskCheck: {
    borderRadius: '50%',
    border: '1px solid #ccc',
    height: '1.5em',
    width: '1.5em',
    transform: 'scale(.5)',
    fontSize: 'inherit',
    background: 'transparent',
    cursor: 'pointer',
    outline: 'none',
  },
  'taskCheckActive': {
    borderColor: '#cb1b45',
    background: '#cb1b45'
  },
  taskTitle: {
    flex: '1 1 100%',
    display: 'block',
    corsor: 'pointer',
  },
  taskTitleActive: {
    textDecoration: 'line-through'
  },
  detail: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: '100%'
  },
  detailBack: {
    position: 'absolute',
    left: '.5em',
    top: '-2.5em'
  }
}).attach();

export default classes;
