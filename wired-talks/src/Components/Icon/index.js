import {
  Send,
  HelpOutline
} from '@mui/icons-material';

const IconComponent = ({name, style, onClick}) => {
  switch (name) {
    case 'send': return <Send onClick={onClick} style={style || {}}/>
    default: return <HelpOutline onClick={onClick} style={style || {}}/>
  }

}

export {
  IconComponent
}