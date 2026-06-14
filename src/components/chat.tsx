import { messageRoleEnum } from "#/db/schema";
import type { getChatsForCustomerQuery } from "#/features/customer/customer.queries";
import type { MessageRole } from "#/features/customer/customer.schema";
import { Dot, PhoneIcon, Send, User } from "lucide-react";
import { Button } from "./ui/button";
import { InputGroup, InputGroupAddon, InputGroupTextarea } from "./ui/input-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { TabsContent } from "./ui/tabs";
import { useAddMessage } from "#/features/customer/customer.hooks";
import { useForm } from "@tanstack/react-form";

type ChatWithMessages = Awaited<ReturnType<typeof getChatsForCustomerQuery>>[number];

export default function Chat({chat}: {chat: ChatWithMessages}){

    const { mutateAsync: sendMessage} = useAddMessage()

    const form = useForm({
        defaultValues: {
            role: 'customer' as MessageRole,
            chat_id: chat.id,
            content: '',
            customer_id: chat.customer_id
        },
        onSubmit: async ({value}) => {
            await sendMessage(value)
        }
    })

    return(
        <TabsContent value={chat.id} key={chat.id} className="flex-1 min-h-0">
            <div className="border h-full flex flex-col p-4 gap-4 rounded">
                <div className="flex gap-1">
                    <span className="inline-flex gap-1 items-center"><User size={14}/>{chat.name}</span>
                    <Dot />
                    <span className="inline-flex gap-1 items-center"><PhoneIcon size={14} />{chat.phone}</span>
                </div>
                <div className="flex-1 overflow-auto @max-xl:max-h-[70vh]">
                    <div className="flex flex-col gap-2">
                        {chat.message.map(msg =>
                            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end': 'justify-start'}`}>
                                <p className={`max-w-4/5 px-3 py-1.5 rounded text-white ${msg.role === 'user' ? 'bg-emerald-800' : 'bg-zinc-700'}`}>{msg.content}</p>
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        form.handleSubmit();
                    }}>
                        <InputGroup className="[--radius:1rem]">
                            <form.Field name="content" children={(field) => {
                                return (
                                    <InputGroupTextarea cols={8} placeholder="Enter message"
                                        name={field.name}
                                        id={field.name}
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        onBlur={() => field.handleBlur}
                                    />
                                )
                            }}
                            />
                            <InputGroupAddon align="block-end" className="justify-between">
                            <form.Field name="role" children={(field) => {
                                return (
                                    <Select value={field.state.value} onValueChange={(e) => field.handleChange(e as MessageRole)}>
                                        <SelectTrigger>
                                        <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                        {messageRoleEnum.enumValues.map(val => 
                                            <SelectItem value={val} key={val}>{val === 'customer' ? 'Customer' : 'Me'}</SelectItem>
                                        )}
                                        </SelectContent>
                                    </Select>
                                )
                            }}
                            />
                            <Button variant="default" size="sm" type="submit"><Send />Send</Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </form>
                </div>
            </div>
        </TabsContent>
    )
}