import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Drumkit from '.';

storiesOf('Drumkit', module)
	.add('divisionSize set to default (20px)', () => <Drumkit />)
	.add('divisionSize set to 4px', () => <Drumkit divisionSize={4} />)
	.add('divisionSize set to 40px', () => <Drumkit divisionSize={40} />);
