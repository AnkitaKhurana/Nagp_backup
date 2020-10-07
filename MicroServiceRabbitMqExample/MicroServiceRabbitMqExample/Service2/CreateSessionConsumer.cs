using MassTransit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Common;
using Nancy.Json;

namespace Service2
{
    [Serializable]
    public class CreateSessionConsumer : IConsumer<Session>
    {
        public static string received;

        public async Task Consume(ConsumeContext<Session> context)
        {
            var receivedmessage = ((MassTransit.Context.ConsumeContextScope<Common.Session>)context).Message;
            JavaScriptSerializer js = new JavaScriptSerializer();
            received = js.Serialize(receivedmessage);
             
        }
    }
}
