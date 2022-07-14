import { isDevMode } from '@angular/core';

let configs = {
  rootUrl: ''
}

if (!isDevMode()) {
  configs.rootUrl = 'api'
} else {
  configs.rootUrl = 'api'
}

export default configs
