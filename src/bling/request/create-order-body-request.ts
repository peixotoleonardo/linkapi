import * as js2xmlparser from 'js2xmlparser';
import { Order } from 'src/order/order.entity';
import { stringify } from 'querystring';

export const make = (apikey: string, order: Order): string => {
  return stringify({
    apikey,
    xml: js2xmlparser.parse('pedido', {
      cliente: {
        nome: order.client,
      },
      items: [
        {
          item: {
            codigo: order.idTransaction,
            descricao: order.title,
            vlr_unit: order.value,
            un: order.currency
          }
        }
      ]
    }),
  });
}
