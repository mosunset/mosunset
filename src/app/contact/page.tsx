"use client";

import PageTitle from "@/components/PageTitle";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

//TODO: reCAPTCHAを実装する

const FormSchema = z.object({
    username: z
        .string()
        .min(1, { message: "入力必須です" })
        .min(2, {
            message: "名前は2文字以上でなければなりません。",
        })
        .max(60, {
            message: "名前は60文字以下でなければなりません。",
        }),
    email: z
        .string()
        .min(1, { message: "入力必須です" })
        .email({ message: "正しいメールアドレスの形式で入力してください" }),
    message: z
        .string()
        .min(1, { message: "入力必須です" })
        .min(2, {
            message: "メッセージは2文字以上でなければなりません。",
        })
        .max(1500, {
            message: "メッセージは1500文字以下でなければなりません。",
        }),
});

const Contact = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            email: "",
            message: "",
        },
        mode: "all",
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "あなたが送信した値は以下の通りです：",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        });
    }

    const sendState = false;
    return (
        <>
            <PageTitle title={"Contact"} />

            <div className="mx-auto max-w-screen-md">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>名前</FormLabel>
                                    <FormControl>
                                        <Input placeholder="日本 太郎" {...field} />
                                    </FormControl>
                                    <FormDescription></FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>メールアドレス</FormLabel>
                                    <FormControl>
                                        <Input placeholder="info@gmail.com" {...field} />
                                    </FormControl>
                                    <FormDescription></FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>メッセージ</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="ここにメッセージを入力" {...field} />
                                    </FormControl>
                                    <FormDescription>1500文字以下</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {sendState ? (
                            <Button type="submit" className="w-full">
                                送信
                            </Button>
                        ) : (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div>
                                            <Button type="button" className="w-full" disabled>
                                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                                送信
                                            </Button>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>送信できません</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}
                    </form>
                </Form>
            </div>
        </>
    );
};

export default Contact;
