'use strict';

var _index = require('/Users/paulmusso1/Documents/perso/vbm/react-drum-machine/node_modules/redbox-react/lib/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('/Users/paulmusso1/Documents/perso/vbm/react-drum-machine/node_modules/react-transform-catch-errors/lib/index.js');

var _index4 = _interopRequireDefault(_index3);

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _index5 = require('/Users/paulmusso1/Documents/perso/vbm/react-drum-machine/node_modules/react-transform-hmr/lib/index.js');

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _components = {
  _component: {}
};

var _UsersPaulmusso1DocumentsPersoVbmReactDrumMachineNode_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
  filename: 'src/js/components/DrumKitConsole.js',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _UsersPaulmusso1DocumentsPersoVbmReactDrumMachineNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
  filename: 'src/js/components/DrumKitConsole.js',
  components: _components,
  locals: [],
  imports: [_react3.default, _index2.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _UsersPaulmusso1DocumentsPersoVbmReactDrumMachineNode_modulesReactTransformHmrLibIndexJs2(_UsersPaulmusso1DocumentsPersoVbmReactDrumMachineNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
  };
}

var React = require('react');
var DrumKitActions = require('../actions/DrumKitActions');

var DrumKitConsole = _wrapComponent('_component')(React.createClass({
  displayName: 'DrumKitConsole',

  timeChange: function timeChange(event) {
    DrumKitActions.timeChange(event.target.value);
  },
  bpmChange: function bpmChange(event) {
    DrumKitActions.bpmChange(event.target.value);
  },

  beatpermeasureChange: function beatpermeasureChange(event) {
    DrumKitActions.beatpermeasureChange(event.target.value);
  },

  dpbClicked: function dpbClicked(event) {
    DrumKitActions.dpbChange(event.target.getAttribute('value'));
  },

  handlePlay: function handlePlay() {
    DrumKitActions.playDrumKit(0);
  },
  handlePause: function handlePause() {
    DrumKitActions.pauseDrumKit();
  },
  handleStop: function handleStop() {
    DrumKitActions.stopDrumKit();
  },

  render: function render() {
    return React.createElement(
      'div',
      { className: 'drumKitConsole', style: { 'marginBottom': '10' } },
      React.createElement(
        'div',
        { className: 'row' },
        React.createElement(
          'form',
          { className: 'form', role: 'form' },
          React.createElement(
            'div',
            { className: 'col-xs-1' },
            React.createElement(
              'label',
              { htmlFor: 'ex1' },
              'time:'
            ),
            React.createElement('input', {
              type: 'number',
              className: 'form-control',
              step: '1',
              min: '0',
              id: 'time',
              value: this.props.time,
              onChange: this.timeChange,
              'aria-describedby': 'basic-addon3' })
          ),
          React.createElement(
            'div',
            { className: 'col-xs-1' },
            React.createElement(
              'label',
              { htmlFor: 'ex1' },
              'bpm:'
            ),
            React.createElement('input', {
              type: 'number',
              className: 'form-control',
              step: '1',
              min: '0',
              id: 'bpm',
              value: this.props.bpm,
              onChange: this.bpmChange,
              'aria-describedby': 'basic-addon3' })
          ),
          React.createElement(
            'div',
            { className: 'col-xs-1' },
            React.createElement(
              'label',
              { htmlFor: 'ex1' },
              'Division/Beat:'
            ),
            React.createElement(
              'div',
              { className: 'btn-group' },
              React.createElement(
                'button',
                {
                  type: 'button',
                  className: 'btn btn-default dropdown-toggle',
                  'data-toggle': 'dropdown',
                  'aria-haspopup': 'true',
                  'aria-expanded': 'false' },
                this.props.divisionperbeat,
                React.createElement('span', { className: 'caret' })
              ),
              React.createElement(
                'ul',
                { className: 'dropdown-menu' },
                React.createElement(
                  'li',
                  null,
                  React.createElement(
                    'a',
                    { href: '#', value: '1', onClick: this.dpbClicked },
                    '1'
                  )
                ),
                React.createElement(
                  'li',
                  null,
                  React.createElement(
                    'a',
                    { href: '#', value: '2', onClick: this.dpbClicked },
                    '2'
                  )
                ),
                React.createElement(
                  'li',
                  null,
                  React.createElement(
                    'a',
                    { href: '#', value: '4', onClick: this.dpbClicked },
                    '4'
                  )
                )
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'col-xs-1' },
            React.createElement(
              'label',
              { htmlFor: 'ex1' },
              'Beat/Measure:'
            ),
            React.createElement('input', { type: 'number',
              className: 'form-control',
              step: '1',
              min: '0',
              id: 'divisionnumber',
              value: this.props.beatpermeasure,
              onChange: this.beatpermeasureChange,
              'aria-describedby': 'basic-addon3' })
          ),
          React.createElement(
            'div',
            { className: 'col-xs-1' },
            React.createElement(
              'label',
              { htmlFor: 'ex1' },
              'divnumber:'
            ),
            React.createElement('input', {
              type: 'number',
              className: 'form-control',
              readOnly: true,
              step: '1',
              min: '0',
              id: 'divisionnumber',
              value: this.props.divisionnumber,
              'aria-describedby': 'basic-addon3' })
          ),
          React.createElement(
            'div',
            { className: 'col-xs-1' },
            React.createElement(
              'label',
              { htmlFor: 'ex1' },
              'ElapsedTime:'
            ),
            React.createElement('input', {
              type: 'number',
              className: 'form-control',
              min: '0',
              step: 'any',
              value: this.props.elapsedtime,
              onChange: this.pausedTimeChange,
              id: 'elapsedtime',
              'aria-describedby': 'basic-addon3' })
          ),
          React.createElement(
            'div',
            { className: 'col-xs-1' },
            React.createElement(
              'label',
              { htmlFor: 'ex1' },
              'Curr Beat:'
            ),
            React.createElement('input', {
              type: 'number',
              className: 'form-control',
              readOnly: true,
              min: '0',
              step: 'any',
              value: this.props.currentbeat,
              id: 'elapsedtime',
              'aria-describedby': 'basic-addon3' })
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'row' },
        React.createElement(
          'a',
          {
            href: '#',
            className: 'btn btn-sm btn-default',
            onClick: this.handlePlay },
          React.createElement('span', { className: 'glyphicon glyphicon-record' })
        ),
        React.createElement(
          'a',
          { href: '#',
            className: 'btn btn-sm btn-default',
            onClick: this.handlePlay },
          React.createElement('span', { className: 'glyphicon glyphicon-play' })
        ),
        React.createElement(
          'a',
          { href: '#',
            className: 'btn btn-sm btn-default',
            onClick: this.handleStop },
          React.createElement('span', { className: 'glyphicon glyphicon-stop' })
        ),
        React.createElement(
          'a',
          { href: '#',
            className: 'btn btn-sm btn-default',
            onClick: this.handlePause },
          React.createElement('span', { className: 'glyphicon glyphicon-pause' })
        )
      )
    );
  }
}));

module.exports = DrumKitConsole;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9qcy9jb21wb25lbnRzL0RydW1LaXRDb25zb2xlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSSxRQUFRLFFBQVEsT0FBUixDQUFaO0FBQ0EsSUFBSSxpQkFBaUIsUUFBUSwyQkFBUixDQUFyQjs7QUFLQSxJQUFJLDhDQUFpQixNQUFNLFdBQU4sQ0FBa0I7QUFBQTs7QUFDckMsY0FBWSxvQkFBUyxLQUFULEVBQWdCO0FBQzFCLG1CQUFlLFVBQWYsQ0FBMEIsTUFBTSxNQUFOLENBQWEsS0FBdkM7QUFDRCxHQUhvQztBQUlyQyxhQUFXLG1CQUFTLEtBQVQsRUFBZ0I7QUFDekIsbUJBQWUsU0FBZixDQUF5QixNQUFNLE1BQU4sQ0FBYSxLQUF0QztBQUNELEdBTm9DOztBQVFyQyx3QkFBc0IsOEJBQVMsS0FBVCxFQUFnQjtBQUNwQyxtQkFBZSxvQkFBZixDQUFvQyxNQUFNLE1BQU4sQ0FBYSxLQUFqRDtBQUNELEdBVm9DOztBQVlyQyxjQUFZLG9CQUFTLEtBQVQsRUFBZTtBQUN6QixtQkFBZSxTQUFmLENBQXlCLE1BQU0sTUFBTixDQUFhLFlBQWIsQ0FBMEIsT0FBMUIsQ0FBekI7QUFDRCxHQWRvQzs7QUFnQnJDLGNBQVcsc0JBQVU7QUFDbkIsbUJBQWUsV0FBZixDQUEyQixDQUEzQjtBQUNELEdBbEJvQztBQW1CckMsZUFBWSx1QkFBVTtBQUNwQixtQkFBZSxZQUFmO0FBQ0QsR0FyQm9DO0FBc0JyQyxjQUFXLHNCQUFVO0FBQ25CLG1CQUFlLFdBQWY7QUFDRCxHQXhCb0M7O0FBMEJyQyxVQUFPLGtCQUFVO0FBQ2YsV0FDRTtBQUFBO01BQUEsRUFBSyxXQUFVLGdCQUFmLEVBQWdDLE9BQU8sRUFBQyxnQkFBZSxJQUFoQixFQUF2QztNQUNFO0FBQUE7UUFBQSxFQUFLLFdBQVUsS0FBZjtRQUNFO0FBQUE7VUFBQSxFQUFNLFdBQVUsTUFBaEIs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QUFNRSx3QkFBVSxLQUFLLGdCQU5qQjtBQU9FLGtCQUFHLGFBUEw7QUFRRSxrQ0FBaUIsY0FSbkI7QUFGRixXQXpFQTtVQXFGQTtBQUFBO1lBQUEsRUFBSyxXQUFVLFVBQWY7WUFDRTtBQUFBO2NBQUEsRUFBTyxTQUFRLEtBQWY7Y0FBQTtBQUFBLGFBREY7WUFFRTtBQUNFLG9CQUFLLFFBRFA7QUFFRSx5QkFBVSxjQUZaO0FBR0Usd0JBQVUsSUFIWjtBQUlFLG1CQUFJLEdBSk47QUFLRSxvQkFBSyxLQUxQO0FBTUUscUJBQU8sS0FBSyxLQUFMLENBQVcsV0FOcEI7QUFPRSxrQkFBRyxhQVBMO0FBUUUsa0NBQWlCLGNBUm5CO0FBRkY7QUFyRkE7QUFERixPQURGO01BcUdBO0FBQUE7UUFBQSxFQUFLLFdBQVUsS0FBZjtRQUNFO0FBQUE7VUFBQTtBQUNFLGtCQUFLLEdBRFA7QUFFRSx1QkFBVSx3QkFGWjtBQUdFLHFCQUFTLEtBQUssVUFIaEI7VUFJRSw4QkFBTSxXQUFVLDRCQUFoQjtBQUpGLFNBREY7UUFRRTtBQUFBO1VBQUEsRUFBRyxNQUFLLEdBQVI7QUFDRSx1QkFBVSx3QkFEWjtBQUVFLHFCQUFTLEtBQUssVUFGaEI7VUFHRSw4QkFBTSxXQUFVLDBCQUFoQjtBQUhGLFNBUkY7UUFjRTtBQUFBO1VBQUEsRUFBRyxNQUFLLEdBQVI7QUFDRSx1QkFBVSx3QkFEWjtBQUVFLHFCQUFTLEtBQUssVUFGaEI7VUFHRSw4QkFBTSxXQUFVLDBCQUFoQjtBQUhGLFNBZEY7UUFvQkU7QUFBQTtVQUFBLEVBQUcsTUFBSyxHQUFSO0FBQ0UsdUJBQVUsd0JBRFo7QUFFRSxxQkFBUyxLQUFLLFdBRmhCO1VBR0UsOEJBQU0sV0FBVSwyQkFBaEI7QUFIRjtBQXBCRjtBQXJHQSxLQURGO0FBbUlIO0FBOUpzQyxDQUFsQixDQUFqQixDQUFKOztBQWlLQSxPQUFPLE9BQVAsR0FBaUIsY0FBakIiLCJmaWxlIjoiRHJ1bUtpdENvbnNvbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIERydW1LaXRBY3Rpb25zID0gcmVxdWlyZSgnLi4vYWN0aW9ucy9EcnVtS2l0QWN0aW9ucycpO1xuXG5cblxuXG52YXIgRHJ1bUtpdENvbnNvbGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHRpbWVDaGFuZ2U6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgRHJ1bUtpdEFjdGlvbnMudGltZUNoYW5nZShldmVudC50YXJnZXQudmFsdWUpO1xuICB9LFxuICBicG1DaGFuZ2U6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgRHJ1bUtpdEFjdGlvbnMuYnBtQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gIH0sXG5cbiAgYmVhdHBlcm1lYXN1cmVDaGFuZ2U6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgRHJ1bUtpdEFjdGlvbnMuYmVhdHBlcm1lYXN1cmVDaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgfSxcblxuICBkcGJDbGlja2VkOiBmdW5jdGlvbihldmVudCl7XG4gICAgRHJ1bUtpdEFjdGlvbnMuZHBiQ2hhbmdlKGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJykpO1xuICB9LFxuXG4gIGhhbmRsZVBsYXk6ZnVuY3Rpb24oKXtcbiAgICBEcnVtS2l0QWN0aW9ucy5wbGF5RHJ1bUtpdCgwKTtcbiAgfSxcbiAgaGFuZGxlUGF1c2U6ZnVuY3Rpb24oKXtcbiAgICBEcnVtS2l0QWN0aW9ucy5wYXVzZURydW1LaXQoKTtcbiAgfSxcbiAgaGFuZGxlU3RvcDpmdW5jdGlvbigpe1xuICAgIERydW1LaXRBY3Rpb25zLnN0b3BEcnVtS2l0KCk7XG4gIH0sXG5cbiAgcmVuZGVyOmZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHJ1bUtpdENvbnNvbGVcIiBzdHlsZT17eydtYXJnaW5Cb3R0b20nOicxMCd9fT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICA8Zm9ybSBjbGFzc05hbWU9XCJmb3JtXCIgcm9sZT1cImZvcm1cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTFcIj5cbiAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJleDFcIj50aW1lOjwvbGFiZWw+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgICAgICAgc3RlcD1cIjFcIlxuICAgICAgICAgICAgICAgIG1pbj1cIjBcIlxuICAgICAgICAgICAgICAgIGlkPVwidGltZVwiXG4gICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMudGltZX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy50aW1lQ2hhbmdlfVxuICAgICAgICAgICAgICAgIGFyaWEtZGVzY3JpYmVkYnk9XCJiYXNpYy1hZGRvbjNcIi8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTFcIj5cbiAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJleDFcIj5icG06PC9sYWJlbD5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICAgICAgICBzdGVwPVwiMVwiXG4gICAgICAgICAgICAgICAgbWluPVwiMFwiXG4gICAgICAgICAgICAgICAgaWQ9XCJicG1cIlxuICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLmJwbX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5icG1DaGFuZ2V9XG4gICAgICAgICAgICAgICAgYXJpYS1kZXNjcmliZWRieT1cImJhc2ljLWFkZG9uM1wiLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMVwiPlxuICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cImV4MVwiPkRpdmlzaW9uL0JlYXQ6PC9sYWJlbD5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidG4tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdCBkcm9wZG93bi10b2dnbGVcIlxuICAgICAgICAgICAgICAgICAgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiXG4gICAgICAgICAgICAgICAgICBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj5cbiAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmRpdmlzaW9ucGVyYmVhdH1cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNhcmV0XCI+PC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImRyb3Bkb3duLW1lbnVcIj5cbiAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiIHZhbHVlPVwiMVwiIG9uQ2xpY2s9e3RoaXMuZHBiQ2xpY2tlZH0+MTwvYT5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCIgdmFsdWU9XCIyXCIgb25DbGljaz17dGhpcy5kcGJDbGlja2VkfT4yPC9hPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIiB2YWx1ZT1cIjRcIiBvbkNsaWNrPXt0aGlzLmRwYkNsaWNrZWR9PjQ8L2E+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTFcIj5cbiAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwiZXgxXCI+QmVhdC9NZWFzdXJlOjwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgICAgIHN0ZXA9XCIxXCJcbiAgICAgICAgICAgICAgbWluPVwiMFwiXG4gICAgICAgICAgICAgIGlkPVwiZGl2aXNpb25udW1iZXJcIlxuICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5iZWF0cGVybWVhc3VyZX1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuYmVhdHBlcm1lYXN1cmVDaGFuZ2V9XG4gICAgICAgICAgICAgIGFyaWEtZGVzY3JpYmVkYnk9XCJiYXNpYy1hZGRvbjNcIi8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMVwiPlxuICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJleDFcIj5kaXZudW1iZXI6PC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICAgICAgcmVhZE9ubHk9e3RydWV9XG4gICAgICAgICAgICAgIHN0ZXA9XCIxXCJcbiAgICAgICAgICAgICAgbWluPVwiMFwiXG4gICAgICAgICAgICAgIGlkPVwiZGl2aXNpb25udW1iZXJcIlxuICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5kaXZpc2lvbm51bWJlcn1cbiAgICAgICAgICAgICAgYXJpYS1kZXNjcmliZWRieT1cImJhc2ljLWFkZG9uM1wiLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy0xXCI+XG4gICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cImV4MVwiPkVsYXBzZWRUaW1lOjwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgICAgIG1pbj1cIjBcIlxuICAgICAgICAgICAgICBzdGVwPVwiYW55XCJcbiAgICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMuZWxhcHNlZHRpbWV9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLnBhdXNlZFRpbWVDaGFuZ2V9XG4gICAgICAgICAgICAgIGlkPVwiZWxhcHNlZHRpbWVcIlxuICAgICAgICAgICAgICBhcmlhLWRlc2NyaWJlZGJ5PVwiYmFzaWMtYWRkb24zXCIvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTFcIj5cbiAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwiZXgxXCI+Q3VyciBCZWF0OjwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgICAgIHJlYWRPbmx5PXt0cnVlfVxuICAgICAgICAgICAgICBtaW49XCIwXCJcbiAgICAgICAgICAgICAgc3RlcD1cImFueVwiXG4gICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLmN1cnJlbnRiZWF0fVxuICAgICAgICAgICAgICBpZD1cImVsYXBzZWR0aW1lXCJcbiAgICAgICAgICAgICAgYXJpYS1kZXNjcmliZWRieT1cImJhc2ljLWFkZG9uM1wiLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICA8YVxuICAgICAgICAgIGhyZWY9XCIjXCJcbiAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLXNtIGJ0bi1kZWZhdWx0XCJcbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZVBsYXl9PlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tcmVjb3JkXCI+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2E+XG4gICAgICAgIDxhIGhyZWY9XCIjXCJcbiAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLXNtIGJ0bi1kZWZhdWx0XCJcbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZVBsYXl9PlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tcGxheVwiPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9hPlxuICAgICAgICA8YSBocmVmPVwiI1wiXG4gICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi1zbSBidG4tZGVmYXVsdFwiXG4gICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVTdG9wfT5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLXN0b3BcIj5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvYT5cbiAgICAgICAgPGEgaHJlZj1cIiNcIlxuICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tc20gYnRuLWRlZmF1bHRcIlxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlUGF1c2V9PlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tcGF1c2VcIj5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvYT5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRHJ1bUtpdENvbnNvbGU7XG4iXX0=