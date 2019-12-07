import React from 'react';
import { Modal } from 'react-native';
import PropTypes from 'prop-types';

import TouchableButton from '../common/buttons/touchableButton';
import EditForm from '../forms/edit-form';

class EditFormModal extends React.Component {
  render() {
    const { 
      word, lang, baseLang, onComplete,
    } = this.props;

    return (
      <Modal
        animationType="fade"
        transparent={ false }
      >
        <TouchableButton
          text={ '<-- Back' }
          stackNav={ this.props.close }
        />
        <EditForm
          word={ word }
          lang={ lang }
          baseLang={ baseLang }
          onComplete={ onComplete }
        />
      </Modal>
    );
  }
}

EditFormModal.propTypes = {
  close: PropTypes.func,
  word: PropTypes.object,
  lang: PropTypes.object,
  baseLang: PropTypes.object,
  onComplete: PropTypes.func,
};

export default EditFormModal;
