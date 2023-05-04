import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type CreateTokenInput = {
  name: Scalars['String'];
  value: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createToken: Token;
  deleteToken: Scalars['Boolean'];
  updateToken?: Maybe<Token>;
};


export type MutationCreateTokenArgs = {
  options: CreateTokenInput;
};


export type MutationDeleteTokenArgs = {
  id: Scalars['Float'];
};


export type MutationUpdateTokenArgs = {
  id: Scalars['Float'];
  name?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  token?: Maybe<Token>;
  tokens: Array<Token>;
  tokensStatistics: Array<TokenStats>;
};


export type QueryTokenArgs = {
  id: Scalars['Float'];
};

export type Token = {
  __typename?: 'Token';
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  name: Scalars['String'];
  updatedAt: Scalars['String'];
  value: Scalars['Float'];
};

export type TokenStats = {
  __typename?: 'TokenStats';
  name: Scalars['String'];
  tokenPerDay: Scalars['Float'];
  tokenPerHour: Scalars['Float'];
  tokenPerMin: Scalars['Float'];
};

export type CreateTokenMutationVariables = Exact<{
  name: Scalars['String'];
  value: Scalars['Float'];
}>;


export type CreateTokenMutation = { __typename?: 'Mutation', createToken: { __typename?: 'Token', id: number, name: string, value: number } };

export type DeleteTokenMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeleteTokenMutation = { __typename?: 'Mutation', deleteToken: boolean };

export type UpdateTokenMutationVariables = Exact<{
  id: Scalars['Float'];
  name: Scalars['String'];
  value: Scalars['Int'];
}>;


export type UpdateTokenMutation = { __typename?: 'Mutation', updateToken?: { __typename?: 'Token', id: number, value: number, name: string } | null };

export type TokensStatisticsQueryVariables = Exact<{ [key: string]: never; }>;


export type TokensStatisticsQuery = { __typename?: 'Query', tokensStatistics: Array<{ __typename?: 'TokenStats', name: string, tokenPerMin: number, tokenPerHour: number, tokenPerDay: number }> };

export type TokensQueryVariables = Exact<{ [key: string]: never; }>;


export type TokensQuery = { __typename?: 'Query', tokens: Array<{ __typename?: 'Token', id: number, name: string, value: number, createdAt: any, updatedAt: string }> };


export const CreateTokenDocument = gql`
    mutation CreateToken($name: String!, $value: Float!) {
  createToken(options: {name: $name, value: $value}) {
    id
    name
    value
  }
}
    `;

export function useCreateTokenMutation() {
  return Urql.useMutation<CreateTokenMutation, CreateTokenMutationVariables>(CreateTokenDocument);
};
export const DeleteTokenDocument = gql`
    mutation DeleteToken($id: Float!) {
  deleteToken(id: $id)
}
    `;

export function useDeleteTokenMutation() {
  return Urql.useMutation<DeleteTokenMutation, DeleteTokenMutationVariables>(DeleteTokenDocument);
};
export const UpdateTokenDocument = gql`
    mutation UpdateToken($id: Float!, $name: String!, $value: Int!) {
  updateToken(id: $id, name: $name, value: $value) {
    id
    value
    name
  }
}
    `;

export function useUpdateTokenMutation() {
  return Urql.useMutation<UpdateTokenMutation, UpdateTokenMutationVariables>(UpdateTokenDocument);
};
export const TokensStatisticsDocument = gql`
    query TokensStatistics {
  tokensStatistics {
    name
    tokenPerMin
    tokenPerHour
    tokenPerDay
  }
}
    `;

export function useTokensStatisticsQuery(options?: Omit<Urql.UseQueryArgs<TokensStatisticsQueryVariables>, 'query'>) {
  return Urql.useQuery<TokensStatisticsQuery>({ query: TokensStatisticsDocument, ...options });
};
export const TokensDocument = gql`
    query Tokens {
  tokens {
    id
    name
    value
    createdAt
    updatedAt
  }
}
    `;

export function useTokensQuery(options?: Omit<Urql.UseQueryArgs<TokensQueryVariables>, 'query'>) {
  return Urql.useQuery<TokensQuery>({ query: TokensDocument, ...options });
};