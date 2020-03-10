const allLogLevels = ['debug', 'info', 'warn', 'error'];
let viewableLogLevels = [];
let connectedApis = [];
let viewableApis = [];
let liveLogs = [];

const filterLogs = () => {
  $(`#log-view ul li`).hide();
  // show filtered logs
  viewableApis.forEach(api => {
    viewableLogLevels.forEach(level => {
      $(`#log-view ul li[logLevel="${level}"][sourceApi="${api}"]`).show();
    });
  });
};

// Update the viewable logs when checkboxs changed
const logLevelsChanged = () => {
  viewableLogLevels = [];
  $(`#log-level-list ul li input`).each(function() {
    if ($(this).is(':checked')) {
      viewableLogLevels.push($(this).attr('logLevel'));
    }
  });
  filterLogs();
};

// Update the viewable logs when checkboxs changed
const viewableApisChanged = () => {
  viewableApis = [];
  $(`#api-list ul li input`).each(function() {
    if ($(this).is(':checked')) {
      viewableApis.push($(this).attr('url'));
    }
  });
  filterLogs();
};

// Map log levels to an appropriate badge
const logLevelLabel = level => {
  const badgeClass = level => {
    let result = '';
    switch (level) {
      case 'debug':
        result = 'secondary';
        break;
      case 'info':
        result = 'info';
        break;
      case 'warn':
        result = 'warning';
        break;
      case 'error':
        result = 'danger';
        break;
      default:
        result = 'primary';
    }
    return result;
  };
  return `<span class="badge badge-${badgeClass(level)}">${level}</span>`;
};

const addToLogWindow = message => {
  liveLogs.push(message);
  pushDataToGraph(liveLogs);
  // Apparently jQuery can't get all params
  var logView = document.getElementById('log-view');
  // allow 1px inaccuracy by adding 1
  var isScrolledToBottom = logView.scrollHeight - logView.clientHeight <= logView.scrollTop + 1;
  // Add message
  $('#log-view ul').append(
    $(
      `<li class="list-group-item" sourceApi="${message.sourceApi}" logLevel="${message.level}">${
        message.timestamp
      }${logLevelLabel(message.level)}${message.msg}</li>`
    )
      .hide()
      .fadeIn(1500)
  );

  filterLogs();

  // scroll to bottom if isScrolledToBottom is true
  if (isScrolledToBottom) {
    logView.scrollTop = logView.scrollHeight - logView.clientHeight;
  }
};

const updateConnectedApiWindow = apis => {
  connectedApis = apis;
  const apiList = $('#api-list ul');
  apiList.empty();
  connectedApis.forEach(api => {
    apiList.append(
      `<li class="list-group-item">
      <input type="checkbox" id="api" name="api" checked url="${api.url}">
      <a target="_blank" href="${api.url}${api.humanLogsUrl}">${api.url}</a>
      </li>`
    );
  });
  // Initialise viewable apis
  viewableApisChanged();
  // Update viewableApis on change
  $(`#api-list ul li input`).change(function() {
    viewableApisChanged();
  });
};

const appendApiEventList = msg => {
  $('#api-event-list ul').append(
    $(`<li class="list-group-item">${msg}</li>`)
      .hide()
      .fadeIn(1500)
  );
};

const apiConnecetd = msg => {
  appendApiEventList(`${new Date().toString()} Api <span class="badge badge-success">Connecetd</span> ${msg}`);
};

const apiDisconnecetd = msg => {
  appendApiEventList(`${new Date().toString()} Api <span class="badge badge-danger">Disconnecetd</span> ${msg}`);
};

// Document ready
$(document).ready(function() {
  // For each log level add a filter box
  allLogLevels.forEach(level => {
    $('#log-level-list ul').append(
      `<li class="list-group-item">
        <input type="checkbox" id="log-level" name="log-level" checked logLevel="${level}">
        ${logLevelLabel(level)}
      </li>`
    );
  });

  // Initialise log levels
  logLevelsChanged();
  // Update viewableLogLevels on change
  $(`#log-level-list ul li input`).change(function() {
    logLevelsChanged();
  });
});
