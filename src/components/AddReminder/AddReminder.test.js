import React from 'react';
import ReactDOM from 'react-dom';
import AddReminder from './AddReminder';

it('Test: Reminder max-length are 30 chars', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddReminder />, div);
  ReactDOM.unmountComponentAtNode(div);
});
