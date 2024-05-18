
import { useCreateOrganization, useDeleteCache, useGetOrganization, useUpdatePrefs } from "@realmocean/sdk";
import { UIController, UINavigate, UIView, useNavigate } from "@tuval/forms";
import { useAccount } from "../../../context/account";

export class LoginSuccess extends UIController {
    public override LoadView(): UIView {
        const { account } = useAccount();
        //  const { memberships, isLoading: isMembershipLoading } = useListAccountMemberships('console');
        const { organization, isLoading } = useGetOrganization({ organizationId: account.$id, hookEnabled: true });

        const navigate = useNavigate();
        const { createTeam, isError, error } = useCreateOrganization();
        const { updatePrefs } = useUpdatePrefs({});
        const { deleteCache } = useDeleteCache('console');

        return (

            /* isLoading ? Fragment() :
                organization == null ?
                    UIViewBuilder(() => {
                        useEffect(() => {
                            Services.Teams.create(account.$id, account.name)
                                .then((team) => {
                                    Services.Accounts.updatePrefs({
                                        ...(account?.prefs ? account?.prefs : {}),
                                        organization: team.$id
                                    }).then(() => {
                                        navigate(`/app/organization-${team.$id}`);
                                    })
                                });
                        }, [])

                        return Text('Organization Creating')
                    })
                    :
                    account.prefs?.organization != null ? UINavigate(`/app/organization-${account.prefs?.organization}`) : */
                        UINavigate(`/app`)


        )
    }
}
