/**
 * ┌──────────────────────────────────────────────────────────────────────────────┐
 * │ See the License for the specific language governing permissions and          │
 * │ limitations under the License.                                               │
 * │                                                                              │
 * │ @class WebhookDto                                                            │
 * ├──────────────────────────────────────────────────────────────────────────────┤
 * │ @important                                                                   │
 * │ For any future changes to the code in this file, it is recommended to        │
 * │ contain, together with the modification, the information of the developer    │
 * │ who changed it and the date of modification.                                 │
 * └──────────────────────────────────────────────────────────────────────────────┘
 */

export class WebhookDto {
  enabled?: boolean;
  url?: string;
  events?: WebhookEvents;
}

export class WebhookEvents {
  qrcodeUpdated?: boolean;
  messagesSet?: boolean;
  messagesUpsert?: boolean;
  messagesUpdated?: boolean;
  sendMessage?: boolean;
  contactsSet?: boolean;
  contactsUpsert?: boolean;
  contactsUpdated?: boolean;
  chatsSet?: boolean;
  chatsUpsert?: boolean;
  chatsUpdated?: boolean;
  chatsDeleted?: boolean;
  presenceUpdated?: boolean;
  groupsUpsert?: boolean;
  groupsUpdated?: boolean;
  groupsParticipantsUpdated?: boolean;
  connectionUpdated?: boolean;
  statusInstance?: boolean;
  refreshToken?: boolean;
  callUpsert?: boolean;
  labelsAssociation?: boolean;
  labelsEdit?: boolean;
}

export type EventsType =
  | 'qrcode.updated'
  | 'connection.update'
  | 'status.instance'
  | 'messages.set'
  | 'messages.upsert'
  | 'messages.update'
  | 'send.message'
  | 'contacts.set'
  | 'contacts.upsert'
  | 'contacts.update'
  | 'presence.update'
  | 'chats.set'
  | 'chats.update'
  | 'chats.upsert'
  | 'chats.delete'
  | 'groups.upsert'
  | 'groups.update'
  | 'group-participants.update'
  | 'status.instance'
  | 'refresh.token'
  | 'call.upsert'
  | 'labels.association'
  | 'labels.edit';

export type WebhookEventsType = keyof WebhookEvents;

export const WebhookEventsEnum: Record<WebhookEventsType, EventsType> = {
  qrcodeUpdated: 'qrcode.updated',
  messagesSet: 'messages.set',
  messagesUpsert: 'messages.upsert',
  messagesUpdated: 'messages.update',
  sendMessage: 'send.message',
  contactsSet: 'contacts.set',
  contactsUpsert: 'contacts.upsert',
  contactsUpdated: 'contacts.update',
  chatsSet: 'chats.set',
  chatsUpsert: 'chats.upsert',
  chatsUpdated: 'chats.update',
  chatsDeleted: 'chats.delete',
  presenceUpdated: 'presence.update',
  groupsUpsert: 'groups.upsert',
  groupsUpdated: 'groups.update',
  groupsParticipantsUpdated: 'group-participants.update',
  connectionUpdated: 'connection.update',
  statusInstance: 'status.instance',
  refreshToken: 'refresh.token',
  callUpsert: 'call.upsert',
  labelsAssociation: 'labels.association',
  labelsEdit: 'labels.edit',
};

export const ListEvents: EventsType[] = Object.values(WebhookEventsEnum);

export type WebhookEventsMap = typeof WebhookEventsEnum;
