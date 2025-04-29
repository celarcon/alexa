import { SkillBuilders } from 'ask-sdk-core'
import { LaunchRequestHandler } from './launch-request-handler'
import { HelpIntentHandler } from './help-intent-handler'
import { CustomErrorHandler } from './custom-error-handler'

export const skill = SkillBuilders.custom()
	.addRequestHandlers(LaunchRequestHandler, HelpIntentHandler)
	.addErrorHandlers(CustomErrorHandler)
	.create()
