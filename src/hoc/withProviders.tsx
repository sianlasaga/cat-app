import { FunctionComponent } from 'react';

// TODO: Implement props type
const withProviders =
  (...providers: FunctionComponent<any>[]) =>
  (WrappedComponent: FunctionComponent<any>) =>
  (props: any) =>
    providers.reduceRight(
      (acc, Provider) => {
        return <Provider>{acc}</Provider>;
      },
      <WrappedComponent {...props} />
    );

export default withProviders;
