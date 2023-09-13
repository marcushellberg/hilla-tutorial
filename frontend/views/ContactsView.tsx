import ContactRecord from 'Frontend/generated/com/example/application/services/CRMService/ContactRecord';
import {useEffect, useState} from 'react';
import {CRMService} from "Frontend/generated/endpoints";
import {Grid} from "@hilla/react-components/Grid";
import {GridColumn} from "@hilla/react-components/GridColumn";
import {useForm} from "@hilla/react-form";
import ContactRecordModel from "Frontend/generated/com/example/application/services/CRMService/ContactRecordModel";
import {TextField} from "@hilla/react-components/TextField";
import {EmailField} from "@hilla/react-components/EmailField";
import {Select} from "@hilla/react-components/Select";
import CompanyRecord from "Frontend/generated/com/example/application/services/CRMService/CompanyRecord";
import {Button} from "@hilla/react-components/Button";

export default function ContactsView() {
    const [contacts, setContacts] = useState<ContactRecord[]>([]);
    const [companies, setCompanies] = useState<CompanyRecord[]>([]);
    const [selected, setSelected] = useState<ContactRecord | null | undefined>();

    const {field, model, submit, reset, read} = useForm(ContactRecordModel, {
        onSubmit: async contact => {
            const saved = await CRMService.save(contact)
            if (contact.id) {
                setContacts(contacts => contacts.map(current => current.id === saved.id ? saved : current));
            } else {
                setContacts(contacts => [...contacts, saved]);
            }
        }
    });

    useEffect(() => {
        CRMService.findAllContacts().then(setContacts);
        CRMService.findAllCompanies().then(setCompanies);
    }, []);

    useEffect(() => {
        read(selected);
    }, [selected]);


    return (
        <div className="p-m flex gap-m">
            <Grid
                items={contacts}
                onActiveItemChanged={e => setSelected(e.detail.value)}
                selectedItems={[selected]}
            >
                <GridColumn path="firstName"/>
                <GridColumn path="lastName"/>
                <GridColumn path="email"/>
                <GridColumn path="company.name" header="Company name"/>
            </Grid>

            <div className="flex flex-col gap-s items-start">
                <TextField label="First name" {...field(model.firstName)} />
                <TextField label="Last name" {...field(model.lastName)} />
                <EmailField label="Email" {...field(model.email)} />
                <Select
                    label="Company"
                    items={companies.map(company => ({
                        label: company.name,
                        value: company.id + ""
                    }))}
                    {...field(model.company.id)} />
                <div className="flex gap-m">
                    <Button onClick={submit} theme="primary">Save</Button>
                    <Button onClick={reset}>Reset</Button>
                </div>
            </div>
        </div>
    );
}
