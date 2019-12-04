import React from 'react';
import { Modal } from 'react-native';
import PropTypes from 'prop-types';

import TouchableButton from '../common/buttons/touchableButton';
import AddForm from '../forms/add-form';

class AddFormModal extends React.Component {
  render() {
    const { 
      lang, baseLang, onComplete,
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
        <AddForm
          lang={ lang }
          baseLang={ baseLang }
          onComplete={ onComplete }
        />
      </Modal>
    );
  }
}

AddFormModal.propTypes = {
  close: PropTypes.func,
  lang: PropTypes.object,
  baseLang: PropTypes.object,
  onComplete: PropTypes.func,
};

export default AddFormModal;
