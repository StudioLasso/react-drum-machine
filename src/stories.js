import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Drumkit from '.';

storiesOf('Drumkit', module)
	.add('basic', () => <Drumkit />);
