
import {
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
    Button,
} from '@react-email/components';

interface props {
    username: string;
    otp: string;
}

export default function VerificationEmail ({ username , otp} :props) {
    return(
        <Html lang="en" dir="ltr">
    <head>
        <title>
            Verification Code
        </title>
        <Font 
        fontFamily="Roboto" 
        fallbackFontFamily="Verdana"
        webFont={{
            url:"https://fonts.gstatic.com/s/roboto/v27/kF0mCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: 'woff2'
        }}
        fontWeight={400} 
        fontStyle="normal" />
    </head>
    <Preview>
        Here&apos;s your verfication code: {otp}
    </Preview>
    <Section>
        <Row>
            <Heading as="h2">Hello {username}</Heading>
        </Row>
        <Row>
            <Text>
                Thank you for registering. Please use the     
                following Verification code to complete
                your registeration
            </Text>
        </Row>
        <Row>
            {otp}
        </Row>
        <Row>
            <Text>
                If you did not request this code, please ignore this email.
            </Text>
        </Row>
    </Section>
</Html>
    )
}