import React from 'react';
import { 
  Modal, Text, View, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

import { BASE } from '../../style/colors';

import TouchableButton from '../common/buttons/touchableButton';

class ConfirmModal extends React.Component {
  render() {
    const { onConfirm, messageTxt } = this.props;

    return (
      <Modal
        animationType="fade"
        transparent={ false }
      >
        <TouchableButton
          text={ '<-- Back' }
          stackNav={ this.props.onBack }
        />
        <View style={ styles.base }>
          <View>
            <Text style={ styles.message }>{ messageTxt }</Text>
            <TouchableButton
              text={ 'Confirm' }
              stackNav={ onConfirm }
            />
          </View>
        </View>
      </Modal>
    );
  }
}

ConfirmModal.propTypes = {
  messageTxt: PropTypes.string,
  onConfirm: PropTypes.func,
  onBack: PropTypes.func,
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: BASE,
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default ConfirmModal;
