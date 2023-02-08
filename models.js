import _ from 'lodash';
import { Schema } from 'rsuite';

const { StringType, ArrayType, ObjectType } = Schema.Types;

const commands = Schema.Model({
  commands: ArrayType().of(ObjectType()
    .shape({
      command: StringType()
        .isRequired('Specify the command')
        .addRule(
          value => value.startsWith('/'),
          'Command should start with "/"'
        ),
      slug: StringType()
    }))
    .addRule(
      value => {
        const commands = value.map(item => item.command);
        return _.uniq(commands).length === commands.length;
      },
      'Some contents have the same command'
    )
});

export { commands };