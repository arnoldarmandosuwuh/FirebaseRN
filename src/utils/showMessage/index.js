import { showMessage } from 'react-native-flash-message'

export const showError = (message) => {
  showMessage({
    message,
    type: 'default',
    backgroundColor: '#D9435E',
    color: '#FFFFFF',
  })
}

export const showSuccess = (message) => {
  showMessage({
    message,
    type: 'default',
    backgroundColor: '#1ABC9C',
    color: '#FFFFFF',
  })
}
