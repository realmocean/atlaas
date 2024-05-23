import { Button, Fragment, HDivider, HStack,TextField, Icon, SecureField, Text, UIController, UIImage, UINavigate, UIView, VStack, cHorizontal, cLeading, cTopLeading, useNavigate, useState } from "@tuval/forms";
import { Services, useCreateEmailSession, useCreateTeam, useGetMe } from "@realmocean/sdk";

import React from "react";

const GoogleLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path d="M24 12.2755C24 11.4598 23.9325 10.6397 23.7885 9.83716H12.2406V14.4581H18.8536C18.5791 15.9485 17.6974 17.2669 16.4063 18.1047V21.103H20.3516C22.6684 19.013 24 15.9264 24 12.2755Z" fill="#4285F4"></path><path d="M12.2408 23.9999C15.5427 23.9999 18.3274 22.9373 20.3562 21.103L16.4109 18.1046C15.3133 18.8366 13.8962 19.2511 12.2453 19.2511C9.05125 19.2511 6.3431 17.139 5.3714 14.2994H1.30017V17.3903C3.37852 21.4425 7.6117 23.9999 12.2408 23.9999Z" fill="#34A853"></path><path d="M5.36688 14.2995C4.85404 12.8091 4.85404 11.1953 5.36688 9.70496V6.61401H1.30015C-0.436312 10.0048 -0.436312 13.9996 1.30015 17.3904L5.36688 14.2995Z" fill="#FBBC04"></path><path d="M12.2407 4.74881C13.9862 4.72235 15.6732 5.36611 16.9373 6.54781L20.4327 3.12176C18.2194 1.08465 15.2818 -0.0353205 12.2407 -4.58262e-05C7.61169 -4.58262e-05 3.37852 2.55737 1.30017 6.61395L5.36689 9.7049C6.33409 6.86088 9.04674 4.74881 12.2407 4.74881Z" fill="#EA4335"></path></g><defs>
        <clipPath id="clip0"><rect width="24" height="24" fill="white"></rect></clipPath>
    </defs></svg>
)

const MicrosoftLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.5352 0.929382H0.929321V11.5353H11.5352V0.929382Z" fill="#F35325"></path><path d="M23.0707 0.929382H12.4647V11.5353H23.0707V0.929382Z" fill="#81BC06"></path><path d="M11.5352 12.4647H0.929321V23.0707H11.5352V12.4647Z" fill="#05A6F0"></path><path d="M23.0707 12.4647H12.4647V23.0707H23.0707V12.4647Z" fill="#FFBA08"></path></svg>
)


export class LoginController extends UIController {
    public override LoadView(): UIView {

        const navigate = useNavigate();

        const { me, isLoading, isError: isAccountGetError } = useGetMe('console');

        const { createEmailSession, isSuccess, isError, error } = useCreateEmailSession('console');

        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        return (
            isLoading ? Fragment() :
                me != null ? UINavigate('/main') :
                    HStack(
                        VStack(
                            VStack({ spacing: 20 })(
                                Text('Sign in')
                                    .foregroundColor('rgb(33, 37, 41)')
                                    .fontSize(32)
                                    .fontWeight('700'),
                                TextField().label('Email'),
                                TextField().label('Password'),
                                HStack(
                                    Text('Sing in')
                                    .foregroundColor('white')
                                    .fontWeight('bold')
                                )
                                .cornerRadius(10)
                                .height(55)
                                .background('radial-gradient(100.03% 140.18% at 0% 85.53%, #ff00ff 0%, #724ebf 95.31%)'),
                                HDivider().height(1).background('#D4D4D3').marginTop(20),

                                VStack({ spacing: 20 })(

                                    HStack({ spacing: 10 })(
                                        Icon(GoogleLogo),
                                        Text('Sign in with Google').fontFamily('"Graphik Regular", sans-serif').fontSize(20)
                                    ).height(55).width('100%')
                                        .cornerRadius(10)
                                        .minWidth(320)
                                        .maxWidth(400)
                                        .marginBottom(20)
                                        .cursor('pointer')
                                        .background('white')
                                        .border('1px solid #d4d4d3')
                                        .shadow({ hover: '0 4px 16px rgba(0, 0, 0, 0.1)' })
                                        .onClick(() => {
                                            Services.Accounts.createOAuth2Session(
                                                "google",
                                                `${window.location.protocol}//${window.location.host}/app/login-success`,
                                                `${window.location.protocol}//${window.location.host}/login-failure`
                                            )

                                        }),
                                    HStack({ spacing: 10 })(
                                        Icon(MicrosoftLogo),
                                        Text('Sign in with Microsoft').fontFamily('"Graphik Regular", sans-serif').fontSize(20)
                                    ).height(55).width('100%')
                                        .cornerRadius(10)
                                        .border('1px solid #d4d4d3')
                                        .minWidth(320)
                                        .maxWidth(400)
                                        .cursor('pointer')
                                        .background('white')
                                        .shadow({ hover: '0 4px 16px rgba(0, 0, 0, 0.1)' })
                                        .onClick(() => {
                                            Services.Accounts.createOAuth2Session(
                                                "microsoft",
                                                `${window.location.protocol}//${window.location.host}/app/login-success`,
                                                `${window.location.protocol}//${window.location.host}/login-failure`
                                            )

                                        }),
                                ).height().paddingTop('30px'),
                            )

                                .maxWidth(400)


                        )
                            .height()
                            .padding()
                            .width('40%'),
                        VStack(
                            VStack({ spacing: 30 })(
                                Text('Atlaas')
                                    .fontSize(60)
                                    .lineHeight(73)
                                    .foregroundColor('white')
                                    .kerning('4px')
                                    .fontWeight('bold')
                                    .fontFamily('Inter, sans-serif'),

                                Text('From tasks and workflows to apps and systems, build and automate anything in one powerful visual platform.')
                                    .fontSize(22)
                                    .lineHeight(24)
                                    .foregroundColor('rgb(226, 208, 231)')
                                    .fontWeight('400')
                                    .fontFamily('Inter, sans-serif'),

                            )
                                .maxWidth(660)
                                .position('absolute')

                        )
                            .width('60%')
                            .width({ before: '100%' })
                            .height({ before: '100%' })
                            .content({ before: '""' })
                            .background({ before: 'radial-gradient(79.85% 56.11% at 69.93% 80.9%, rgba(254, 0, 254, 0.2) 0%, rgba(244, 7, 245, 0.2) 0.01%, rgba(36, 3, 66, 0.2) 100%) #240342' })
                            .background('linear-gradient(157deg, rgb(181, 93, 205) 0%, rgb(114, 78, 191) 100%)'),

                        /*   VStack({ alignment: cLeading, spacing: 10 })(
                              Text('Email').fontSize(16),
                              TextField().fontSize(16).padding(10).onChange(e => setEmail(e)),
                              Text('Password').fontSize(16),
                              SecureField().fontSize(16).padding(10).onChange(e => setPassword(e)),
                              VStack({ spacing: 10 })(
                                  Button(
                                      Text('Login')
                                  ).width('50%')
                                      .onClick(() => {
                                          createEmailSession({
                                              email: email,
                                              password: password
                                          }, () => {
                                              navigate('/main')
                                          })
                                      }),
                                  Text('or'),
                                  Button(
                                      Text('SignUp')
                                  ).width('50%')
                                      .onClick(() => {
                                          navigate('/signup');
                                      })
                              ).height(),
                              isError && Text(error?.message),
                              isSuccess && UINavigate('/main')
                          ).width('50%').padding(100) */
                    )
                        .background('F8F8F8')


        )
    }
}