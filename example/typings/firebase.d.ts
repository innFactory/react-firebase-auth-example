declare module 'jss-preset-default';
declare module 'react-jss/*';


declare module 'firebase-types' {

    import { FirebaseApp } from '@firebase/app-types';
    import { Observer, Unsubscribe } from '@firebase/util';
    // import { FirebaseNamespace } from '@firebase/app-types';

    export interface User extends UserInfo {
        delete(): Promise<void>;
        emailVerified: boolean;
        getIdTokenResult(forceRefresh?: boolean): Promise<IdTokenResult>;
        getIdToken(forceRefresh?: boolean): Promise<string>;
        isAnonymous: boolean;
        linkAndRetrieveDataWithCredential(
            credential: AuthCredential
        ): Promise<UserCredential>;
        linkWithCredential(credential: AuthCredential): Promise<User>;
        linkWithPhoneNumber(
            phoneNumber: string,
            applicationVerifier: ApplicationVerifier
        ): Promise<ConfirmationResult>;
        linkWithPopup(provider: AuthProvider): Promise<UserCredential>;
        linkWithRedirect(provider: AuthProvider): Promise<void>;
        metadata: UserMetadata;
        phoneNumber: string | null;
        providerData: (UserInfo | null)[];
        reauthenticateAndRetrieveDataWithCredential(
            credential: AuthCredential
        ): Promise<UserCredential>;
        reauthenticateWithCredential(credential: AuthCredential): Promise<void>;
        reauthenticateWithPhoneNumber(
            phoneNumber: string,
            applicationVerifier: ApplicationVerifier
        ): Promise<ConfirmationResult>;
        reauthenticateWithPopup(provider: AuthProvider): Promise<UserCredential>;
        reauthenticateWithRedirect(provider: AuthProvider): Promise<void>;
        refreshToken: string;
        reload(): Promise<void>;
        sendEmailVerification(
            actionCodeSettings?: ActionCodeSettings | null
        ): Promise<void>;
        toJSON(): Object;
        unlink(providerId: string): Promise<User>;
        updateEmail(newEmail: string): Promise<void>;
        updatePassword(newPassword: string): Promise<void>;
        updatePhoneNumber(phoneCredential: AuthCredential): Promise<void>;
        updateProfile(profile: {
            displayName: string | null;
            photoURL: string | null;
        }): Promise<void>;
    }

    export interface FullMetadata extends UploadMetadata {
        bucket: string;
        fullPath: string;
        generation: string;
        metageneration: string;
        name: string;
        size: number;
        timeCreated: string;
        updated: string;
    }

    interface StorageError {
        stack?: string;
    }

    export interface Reference {
        bucket: string;
        child(path: string): Reference;
        delete(): Promise<void>;
        fullPath: string;
        getDownloadURL(): Promise<string>;
        getMetadata(): Promise<FullMetadata>;
        name: string;
        parent: Reference | null;
        put(
            data: Blob | Uint8Array | ArrayBuffer,
            metadata?: UploadMetadata
        ): UploadTask;
        putString(
            data: string,
            format?: StringFormat,
            metadata?: UploadMetadata
        ): UploadTask;
        root: Reference;
        storage: Storage;
        toString(): string;
        updateMetadata(metadata: SettableMetadata): Promise<FullMetadata>;
    }

    export interface SettableMetadata {
        cacheControl?: string | null;
        contentDisposition?: string | null;
        contentEncoding?: string | null;
        contentLanguage?: string | null;
        contentType?: string | null;
        customMetadata?: {
            [/* warning: coerced from ? */ key: string]: string;
        } | null;
    }

    export type StringFormat = string;
    export type TaskEvent = string;
    export type TaskState = string;

    export interface UploadMetadata extends SettableMetadata {
        md5Hash?: string | null;
    }

    export interface UploadTask {
        cancel(): boolean;
        catch(onRejected: (a: StorageError) => any): Promise<any>;
        on(
            event: TaskEvent,
            nextOrObserver?:
                | Observer<UploadTaskSnapshot>
                | null
                | ((a: UploadTaskSnapshot) => any),
            error?: ((a: StorageError) => any) | null,
            complete?: (Unsubscribe) | null
        ): Function;
        pause(): boolean;
        resume(): boolean;
        snapshot: UploadTaskSnapshot;
        then(
            onFulfilled?: ((a: UploadTaskSnapshot) => any) | null,
            onRejected?: ((a: StorageError) => any) | null
        ): Promise<any>;
    }

    export interface UploadTaskSnapshot {
        bytesTransferred: number;
        metadata: FullMetadata;
        ref: Reference;
        state: TaskState;
        task: UploadTask;
        totalBytes: number;
    }

    export interface UserInfo {
        displayName: string | null;
        email: string | null;
        phoneNumber: string | null;
        photoURL: string | null;
        providerId: string;
        uid: string;
    }

    export interface ActionCodeInfo {
        data: {
            email?: string | null;
            fromEmail?: string | null;
        };
        operation: string;
    }

    export type ActionCodeSettings = {
        android?: {
            installApp?: boolean;
            minimumVersion?: string;
            packageName: string;
        };
        handleCodeInApp?: boolean;
        iOS?: { bundleId: string };
        url: string;
    };

    export type AdditionalUserInfo = {
        isNewUser: boolean;
        profile: Object | null;
        providerId: string;
        username?: string | null;
    };

    export interface ApplicationVerifier {
        type: string;
        verify(): Promise<string>;
    }

    export interface AuthCredential {
        providerId: string;
        signInMethod: string;
    }

    export interface AuthProvider {
        providerId: string;
    }

    export interface ConfirmationResult {
        confirm(verificationCode: string): Promise<UserCredential>;
        verificationId: string;
    }

    export class EmailAuthProvider extends EmailAuthProvider_Instance {
        static PROVIDER_ID: string;
        static EMAIL_PASSWORD_SIGN_IN_METHOD: string;
        static EMAIL_LINK_SIGN_IN_METHOD: string;
        static credential(email: string, password: string): AuthCredential;
        static credentialWithLink(email: string, emailLink: string): AuthCredential;
    }
    export class EmailAuthProvider_Instance implements AuthProvider {
        providerId: string;
    }

    export interface Error {
        code: string;
        message: string;
    }

    export class FacebookAuthProvider extends FacebookAuthProvider_Instance {
        static PROVIDER_ID: string;
        static FACEBOOK_SIGN_IN_METHOD: string;
        static credential(token: string): AuthCredential;
    }
    export class FacebookAuthProvider_Instance implements AuthProvider {
        addScope(scope: string): AuthProvider;
        providerId: string;
        setCustomParameters(customOAuthParameters: Object): AuthProvider;
    }

    export class GithubAuthProvider extends GithubAuthProvider_Instance {
        static PROVIDER_ID: string;
        static GITHUB_SIGN_IN_METHOD: string;
        static credential(token: string): AuthCredential;
    }
    export class GithubAuthProvider_Instance implements AuthProvider {
        addScope(scope: string): AuthProvider;
        providerId: string;
        setCustomParameters(customOAuthParameters: Object): AuthProvider;
    }

    export class GoogleAuthProvider extends GoogleAuthProvider_Instance {
        static PROVIDER_ID: string;
        static GOOGLE_SIGN_IN_METHOD: string;
        static credential(
            idToken?: string | null,
            accessToken?: string | null
        ): AuthCredential;
    }
    export class GoogleAuthProvider_Instance implements AuthProvider {
        addScope(scope: string): AuthProvider;
        providerId: string;
        setCustomParameters(customOAuthParameters: Object): AuthProvider;
    }

    export interface IdTokenResult {
        token: string;
        expirationTime: string;
        authTime: string;
        issuedAtTime: string;
        signInProvider: string | null;
        claims: {
            [key: string]: any;
        };
    }

    export class OAuthProvider implements AuthProvider {
        providerId: string;
        addScope(scope: string): AuthProvider;
        credential(idToken?: string, accessToken?: string): OAuthCredential;
        setCustomParameters(customOAuthParameters: Object): AuthProvider;
    }

    export class PhoneAuthProvider extends PhoneAuthProvider_Instance {
        static PROVIDER_ID: string;
        static PHONE_SIGN_IN_METHOD: string;
        static credential(
            verificationId: string,
            verificationCode: string
        ): AuthCredential;
    }
    export class PhoneAuthProvider_Instance implements AuthProvider {
        constructor(auth?: FirebaseAuth | null);
        providerId: string;
        verifyPhoneNumber(
            phoneNumber: string,
            applicationVerifier: ApplicationVerifier
        ): Promise<string>;
    }

    export class RecaptchaVerifier extends RecaptchaVerifier_Instance { }
    export class RecaptchaVerifier_Instance implements ApplicationVerifier {
        constructor(
            container: any | string,
            parameters?: Object | null,
            app?: FirebaseApp | null
        );
        clear(): void;
        render(): Promise<number>;
        type: string;
        verify(): Promise<string>;
    }

    export class TwitterAuthProvider extends TwitterAuthProvider_Instance {
        static PROVIDER_ID: string;
        static TWITTER_SIGN_IN_METHOD: string;
        static credential(token: string, secret: string): AuthCredential;
    }
    export class TwitterAuthProvider_Instance implements AuthProvider {
        providerId: string;
        setCustomParameters(customOAuthParameters: Object): AuthProvider;
    }

    export type UserCredential = {
        additionalUserInfo?: AdditionalUserInfo | null;
        credential: AuthCredential | null;
        operationType?: string | null;
        user: User | null;
    };

    export interface UserMetadata {
        creationTime?: string;
        lastSignInTime?: string;
    }

    export type Persistence = string;

    export interface OAuthCredential extends AuthCredential {
        idToken?: string;
        accessToken?: string;
        secret?: string;
    }

    export interface AuthSettings {
        appVerificationDisabledForTesting: boolean;
    }

    export class FirebaseStorage {
        private constructor();

        app: FirebaseApp;
        maxOperationRetryTime: number;
        maxUploadRetryTime: number;
        ref(path?: string): Reference;
        refFromURL(url: string): Reference;
        setMaxOperationRetryTime(time: number): void;
        setMaxUploadRetryTime(time: number): void;
    }

    export class FirebaseAuth {
        private constructor();

        static Persistence: {
            LOCAL: Persistence;
            NONE: Persistence;
            SESSION: Persistence;
        };

        app: FirebaseApp;
        applyActionCode(code: string): Promise<void>;
        checkActionCode(code: string): Promise<ActionCodeInfo>;
        confirmPasswordReset(code: string, newPassword: string): Promise<void>;
        createUserWithEmailAndPassword(
            email: string,
            password: string
        ): Promise<UserCredential>;
        createUserAndRetrieveDataWithEmailAndPassword(
            email: string,
            password: string
        ): Promise<UserCredential>;
        currentUser: User | null;
        fetchProvidersForEmail(email: string): Promise<Array<string>>;
        fetchSignInMethodsForEmail(email: string): Promise<Array<string>>;
        isSignInWithEmailLink(emailLink: string): boolean;
        getRedirectResult(): Promise<UserCredential>;
        languageCode: string | null;
        settings: AuthSettings;
        onAuthStateChanged(
            nextOrObserver: Observer<any> | ((a: User | null) => any),
            error?: (a: Error) => any,
            completed?: Unsubscribe
        ): Unsubscribe;
        onIdTokenChanged(
            nextOrObserver: Observer<any> | ((a: User | null) => any),
            error?: (a: Error) => any,
            completed?: Unsubscribe
        ): Unsubscribe;
        sendSignInLinkToEmail(
            email: string,
            actionCodeSettings: ActionCodeSettings
        ): Promise<void>;
        sendPasswordResetEmail(
            email: string,
            actionCodeSettings?: ActionCodeSettings | null
        ): Promise<void>;
        setPersistence(persistence: Persistence): Promise<void>;
        signInAndRetrieveDataWithCredential(
            credential: AuthCredential
        ): Promise<UserCredential>;
        signInAnonymously(): Promise<UserCredential>;
        signInAnonymouslyAndRetrieveData(): Promise<UserCredential>;
        signInWithCredential(credential: AuthCredential): Promise<User>;
        signInWithCustomToken(token: string): Promise<UserCredential>;
        signInAndRetrieveDataWithCustomToken(token: string): Promise<UserCredential>;
        signInWithEmailAndPassword(
            email: string,
            password: string
        ): Promise<UserCredential>;
        signInAndRetrieveDataWithEmailAndPassword(
            email: string,
            password: string
        ): Promise<UserCredential>;
        signInWithEmailLink(
            email: string,
            emailLink?: string
        ): Promise<UserCredential>;
        signInWithPhoneNumber(
            phoneNumber: string,
            applicationVerifier: ApplicationVerifier
        ): Promise<ConfirmationResult>;
        signInWithPopup(provider: AuthProvider): Promise<UserCredential>;
        signInWithRedirect(provider: AuthProvider): Promise<void>;
        signOut(): Promise<void>;
        updateCurrentUser(user: User | null): Promise<void>;
        useDeviceLanguage(): void;
        verifyPasswordResetCode(code: string): Promise<string>;
    }

    export function registerStorage(instance: any): void;

    interface FirebaseNamespace {
        auth: {
            (app?: FirebaseApp): FirebaseAuth;
            Auth: typeof FirebaseAuth;
            EmailAuthProvider: typeof EmailAuthProvider;
            EmailAuthProvider_Instance: typeof EmailAuthProvider_Instance;
            FacebookAuthProvider: typeof FacebookAuthProvider;
            FacebookAuthProvider_Instance: typeof FacebookAuthProvider_Instance;
            GithubAuthProvider: typeof GithubAuthProvider;
            GithubAuthProvider_Instance: typeof GithubAuthProvider_Instance;
            GoogleAuthProvider: typeof GoogleAuthProvider;
            GoogleAuthProvider_Instance: typeof GoogleAuthProvider_Instance;
            OAuthProvider: typeof OAuthProvider;
            PhoneAuthProvider: typeof PhoneAuthProvider;
            PhoneAuthProvider_Instance: typeof PhoneAuthProvider_Instance;
            RecaptchaVerifier: typeof RecaptchaVerifier;
            RecaptchaVerifier_Instance: typeof RecaptchaVerifier_Instance;
            TwitterAuthProvider: typeof TwitterAuthProvider;
            TwitterAuthProvider_Instance: typeof TwitterAuthProvider_Instance;
        };
        storage: {
            (app?: FirebaseApp): FirebaseStorage;
            Storage: typeof FirebaseStorage;
            StringFormat: {
                BASE64: StringFormat;
                BASE64URL: StringFormat;
                DATA_URL: StringFormat;
                RAW: StringFormat;
            };
            TaskEvent: {
                STATE_CHANGED: TaskEvent;
            };
            TaskState: {
                CANCELED: TaskState;
                ERROR: TaskState;
                PAUSED: TaskState;
                RUNNING: TaskState;
                SUCCESS: TaskState;
            };
        };
    }
    interface FirebaseApp {
        auth(): FirebaseAuth;
        storage(storageBucket?: string): FirebaseStorage;
    }
}